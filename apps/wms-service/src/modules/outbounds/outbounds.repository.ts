import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import activeOption from 'src/config/active.config';
import { Status } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { ResponseAvailableInventoryType } from 'src/types/response.available.inventory.type';
import { isListAvailableInventoryPositive } from 'src/utils/calculate.util';
import { ItemsRepository } from '../items/items.repository';
import { CreateOutboundDto } from './dto/create.update.outbound.dto/create.outbound.dto';
import { UpdateOutboundDto } from './dto/create.update.outbound.dto/update.outbound.dto';
import { FilterPaginationOutboundDto } from './dto/filter.pagination.outbound.dto/filter.pagination.outbound.dto';
import { UpdateStatusOutboundDto } from './dto/update.status.outbound.dto';
import { Outbound, OutboundDocument } from './schemas/outbound.schema';

@Injectable()
export class OutboundsRepository {
  constructor(
    @InjectModel(Outbound.name) private readonly outboundModel: Model<Outbound>,
    @Inject(ItemsRepository) private readonly itemsRepository: ItemsRepository,
  ) {}

  async create(
    createOutboundDto: CreateOutboundDto,
  ): Promise<OutboundDocument> {
    const { items }: CreateOutboundDto = createOutboundDto;
    try {
      await this.itemsRepository.isIdDtoMatchesIdDb(items);

      const availableInventory: ResponseAvailableInventoryType =
        await this.itemsRepository.getAllToCalculateAvailableInventory();

      isListAvailableInventoryPositive(availableInventory, items);

      // create new outbound order
      return await this.outboundModel.create(createOutboundDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByOption(
    filterPaginationOutboundDto: FilterPaginationOutboundDto,
  ): Promise<OutboundDocument[]> {
    const { filter, pagination }: FilterPaginationOutboundDto =
      filterPaginationOutboundDto;
    try {
      return await this.outboundModel
        .find({
          active: activeOption,
          ...filter,
        })
        .limit(pagination.perPage)
        .skip(pagination.perPage * pagination.page)
        .exec();
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateInboundStatus(
    id: string,
    updateStatusOutboundDto: UpdateStatusOutboundDto,
  ): Promise<OutboundDocument> {
    const statusChange: string = updateStatusOutboundDto.status;
    try {
      const outbound = await this.outboundModel.findOneAndUpdate(
        { _id: id, active: activeOption, status: Status.NEW },
        { status: statusChange },
        { new: true },
      );
      if (!outbound) {
        throw new BadRequestException('outbound not found or Invalid status');
      }
      return outbound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOutbound(
    id: string,
    updateOutboundDto: UpdateOutboundDto,
  ): Promise<OutboundDocument> {
    try {
      const { items }: UpdateOutboundDto = updateOutboundDto;
      await this.itemsRepository.isIdDtoMatchesIdDb(items);
      const outbound = await this.outboundModel.findOneAndUpdate(
        { _id: id, active: activeOption, status: Status.NEW },
        {
          items: items,
        },
        {
          new: true,
        },
      );
      if (!outbound) {
        throw new BadRequestException('Outbound not found');
      }
      return outbound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async softDelete(id: string): Promise<OutboundDocument> {
    try {
      const outbound = await this.outboundModel.findOneAndUpdate(
        { _id: id, status: Status.NEW, active: activeOption },
        {
          active: false,
        },
        {
          new: true,
        },
      );
      if (!outbound) {
        throw new BadRequestException('Outbound not found');
      }
      return outbound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
