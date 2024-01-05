import { Injectable } from '@nestjs/common';
import { CreateOutboundDto } from './dto/create.update.outbound.dto/create.outbound.dto';
import { UpdateOutboundDto } from './dto/create.update.outbound.dto/update.outbound.dto';
import { FilterPaginationOutboundDto } from './dto/filter.pagination.outbound.dto/filter.pagination.outbound.dto';
import { UpdateStatusOutboundDto } from './dto/update.status.outbound.dto';
import { OutboundsRepository } from './outbounds.repository';
import { OutboundDocument } from './schemas/outbound.schema';

@Injectable()
export class OutboundsService {
  constructor(private readonly outboundsRepository: OutboundsRepository) {}

  async create(
    createOutboundDto: CreateOutboundDto,
  ): Promise<OutboundDocument> {
    return await this.outboundsRepository.create(createOutboundDto);
  }

  async findByOption(
    filterPaginationOutboundDto: FilterPaginationOutboundDto,
  ): Promise<OutboundDocument[]> {
    return await this.outboundsRepository.findByOption(
      filterPaginationOutboundDto,
    );
  }

  async updateInboundStatus(
    id: string,
    updateStatusOutboundDto: UpdateStatusOutboundDto,
  ): Promise<OutboundDocument> {
    return await this.outboundsRepository.updateInboundStatus(
      id,
      updateStatusOutboundDto,
    );
  }

  async updateOutbound(
    id: string,
    updateOutboundDto: UpdateOutboundDto,
  ): Promise<OutboundDocument> {
    return this.outboundsRepository.updateOutbound(id, updateOutboundDto);
  }

  async softDelete(id: string): Promise<OutboundDocument> {
    return this.outboundsRepository.softDelete(id);
  }
}
