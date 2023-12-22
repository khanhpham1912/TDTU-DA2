import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import activeOption from 'src/config/active.config';
import { options } from 'src/config/plain.config';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { CreateItemDto } from './dto/create.update.item.dto.ts/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto.ts/update.item.dto';
import { FindingOptionItemDto } from './dto/finding.option.item.dto';
import { Item, ItemDocument } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<ItemDocument> {
    const newCreateItemDto = plainToInstance(
      CreateItemDto,
      createItemDto,
      options,
    );
    try {
      return await this.itemModel.create(newCreateItemDto);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async findByOption(
    findingOptionItemDto: FindingOptionItemDto,
  ): Promise<ItemDocument[]> {
    const newFindingOptionDto = plainToInstance(
      FindingOptionItemDto,
      findingOptionItemDto,
      options,
    );
    try {
      return await this.itemModel
        .find({
          ...newFindingOptionDto,
          active: activeOption,
        })
        .exec();
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  // TODO: update items
  async updateInbound(
    id: string,
    updateItemDto: UpdateItemDto,
  ): Promise<ItemDocument> {
    const newUpdateItemDto = plainToInstance(
      UpdateItemDto,
      updateItemDto,
      options,
    );
    try {
      return this.itemModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        {
          items: newUpdateItemDto,
        },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  // TODO: pagination

  async softDelete(id: string): Promise<ItemDocument> {
    //  TODO: you need to validate if the item is on order or not.
    try {
      return this.itemModel.findByIdAndUpdate(id, {
        active: false,
      });
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }
}
