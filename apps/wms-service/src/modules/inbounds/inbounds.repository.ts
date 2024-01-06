import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import activeOption from 'src/config/active.config';
import { EStatus } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { ItemsRepository } from '../items/items.repository';
import { CreateInboundDto } from './dto/create.update.inbound.dto/create.inbound.dto';
import { UpdateInboundDto } from './dto/create.update.inbound.dto/update.inbound.dto';
import { FilterPaginationInboundDto } from './dto/filter.pagination.inbound.dto/filter.pagination.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { Inbound, InboundDocument } from './schemas/inbound.schema';

@Injectable()
export class InboundRepository {
  constructor(
    @InjectModel(Inbound.name) private readonly inboundModel: Model<Inbound>,
    @Inject(ItemsRepository) private readonly itemsRepository: ItemsRepository,
  ) {}

  // create new inbound order
  async create(createInboundDto: CreateInboundDto): Promise<InboundDocument> {
    const { items }: CreateInboundDto = createInboundDto;

    try {
      await this.itemsRepository.isIdDtoMatchesIdDb(items);
      // create new inbound order
      return await this.inboundModel.create(createInboundDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByOption(filterPaginationInboundDto: FilterPaginationInboundDto): Promise<InboundDocument[]> {
    const { filter, pagination }: FilterPaginationInboundDto = filterPaginationInboundDto;
    try {
      return await this.inboundModel
        .find({
          active: activeOption,
          ...filter,
        })
        .limit(pagination.perPage)
        .skip(pagination.perPage * pagination.page)
        .lean();
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateInboundStatus(id: string, updateStatusInboundDto: UpdateStatusInboundDto): Promise<InboundDocument> {
    const statusChange: string = updateStatusInboundDto.status;
    try {
      const inbound = await this.inboundModel.findOneAndUpdate(
        { _id: id, active: activeOption, status: EStatus.NEW },
        { status: statusChange },
        { new: true },
      );
      if (!inbound) {
        throw new BadRequestException('Inbound not found or Invalid status');
      }
      return inbound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateInbound(id: string, updateInboundDto: UpdateInboundDto): Promise<InboundDocument> {
    try {
      const { items }: UpdateInboundDto = updateInboundDto;
      await this.itemsRepository.isIdDtoMatchesIdDb(items);
      const inbound = await this.inboundModel.findOneAndUpdate(
        { _id: id, active: activeOption, status: EStatus.NEW },
        {
          items: items,
        },
        {
          new: true,
        },
      );
      if (!inbound) {
        throw new BadRequestException('Inbound not found');
      }
      return inbound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async softDelete(id: string): Promise<InboundDocument> {
    try {
      const inbound = await this.inboundModel.findOneAndUpdate(
        { _id: id, status: EStatus.NEW, active: activeOption },
        {
          active: false,
        },
        {
          new: true,
        },
      );
      if (!inbound) {
        throw new BadRequestException('Inbound not found');
      }
      return inbound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
