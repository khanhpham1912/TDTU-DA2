import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemQuantity } from 'src/common/item.quantity';
import activeOption from 'src/config/active.config';
import { EStatus } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { MapItemsAndInventory } from 'src/types/map.items.and.inventory';
import { ResponseAvailableInventoryType } from 'src/types/response.available.inventory.type';
import { ResponseInventoryType } from 'src/types/response.inventory.type';
import { calculateListAvailableInventory, calculateListInventory } from 'src/utils/calculate.util';
import { Inbound } from '../inbounds/schemas/inbound.schema';
import { Item, ItemDocument } from '../items/item.schema';
import { Outbound } from '../outbounds/schemas/outbound.schema';
import { CreateItemDto } from './dto/create.update.item.dto/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto/update.item.dto';
import { FilterPaginationItemDto } from './dto/filter.pagination.item.dto/filter.pagination.item.dto';

@Injectable()
export class ItemsRepository {
  constructor(
    @InjectModel(Inbound.name) private readonly inboundModel: Model<Inbound>,
    @InjectModel(Outbound.name) private readonly outboundModel: Model<Outbound>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<ItemDocument> {
    try {
      return await this.itemModel.create(createItemDto);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async findByOption(filterPaginationItemDto: FilterPaginationItemDto): Promise<MapItemsAndInventory[]> {
    const { filter, pagination }: FilterPaginationItemDto = filterPaginationItemDto;
    try {
      const promiseOne = this.itemModel
        .find({
          active: activeOption,
          ...filter,
        })
        .limit(pagination.perPage)
        .skip(pagination.perPage * pagination.page)
        .exec();

      const promiseTwo = this.getAllToCalculateInventory();
      const promiseThree = this.getAllToCalculateAvailableInventory();

      const [items, inventory, availableInventory] = await Promise.all([promiseOne, promiseTwo, promiseThree]);

      const listInventory: number[] = calculateListInventory(items, inventory);
      const listAvailableInventory: number[] = calculateListAvailableInventory(items, availableInventory);
      return this.mapItemInventoryAInventory(items, listInventory, listAvailableInventory);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateItem(id: string, updateItemDto: UpdateItemDto): Promise<ItemDocument> {
    const { sku, name } = updateItemDto;
    try {
      const result = await this.itemModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        {
          sku: sku,
          name: name,
        },
        {
          new: true,
        },
      );
      if (!result) throw new BadRequestException('Item not found');
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async softDelete(id: string): Promise<ItemDocument> {
    try {
      await this.isItemInOrder(id);
      const result = await this.itemModel.findByIdAndUpdate(
        id,
        {
          active: false,
        },
        {
          new: true,
        },
      );
      if (!result) throw new BadRequestException('Item not found');
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllToCalculateAvailableInventory(): Promise<ResponseAvailableInventoryType> {
    try {
      const filter: object = {
        active: activeOption,
        status: EStatus.COMPLETED,
      };
      const inboundsCompleted = this.inboundModel.find(filter);
      const outboundsCompleted = this.outboundModel.find(filter);
      const outboundsNew = this.outboundModel.find({
        ...filter,
        status: EStatus.NEW,
      });
      return await Promise.all([inboundsCompleted, outboundsCompleted, outboundsNew]);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  // check if id in dto matches id in database
  async isIdDtoMatchesIdDb(itemQuantity: ItemQuantity[]): Promise<void> {
    const IdDto: string[] = itemQuantity.map((item) => {
      return item.id;
    });

    try {
      const IdDb = await this.itemModel
        .find({
          active: activeOption,
        })
        .where('_id')
        .in(IdDto)
        .exec();

      if (IdDto.length !== IdDb.length) throw new BadRequestException('Invalid item id');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async getAllToCalculateInventory(): Promise<ResponseInventoryType> {
    try {
      const filter: object = {
        active: activeOption,
        status: EStatus.COMPLETED,
      };
      const inboundsCompleted = this.inboundModel.find(filter);
      const outboundsCompleted = this.outboundModel.find(filter);
      const inboundsNew = this.inboundModel.find({
        ...filter,
        status: EStatus.NEW,
      });
      return await Promise.all([inboundsCompleted, outboundsCompleted, inboundsNew]);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  private mapItemInventoryAInventory(
    items: ItemDocument[],
    listInventory: number[],
    listAvailableInventory: number[],
  ): MapItemsAndInventory[] {
    return items.map((item, index) => {
      return {
        ...item.toObject(),
        inventory: listInventory[index],
        availableInventory: listAvailableInventory[index],
      } as MapItemsAndInventory;
    });
  }

  private async isItemInOrder(id: string) {
    const filter: object = {
      active: activeOption,
    };
    const promiseOne = this.inboundModel.find(filter);
    const promiseTwo = this.outboundModel.find(filter);

    const orders = await Promise.all([promiseOne, promiseTwo]);

    orders.flat(2).map((order) => {
      order.items.map((item) => {
        if (item.id === id) throw new BadRequestException('This item has been ordered');
      });
    });
  }
}
