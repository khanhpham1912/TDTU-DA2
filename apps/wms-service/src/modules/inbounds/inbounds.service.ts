import { Injectable } from '@nestjs/common';
import { CreateInboundDto } from './dto/create.update.inbound.dto/create.inbound.dto';
import { UpdateInboundDto } from './dto/create.update.inbound.dto/update.inbound.dto';
import { FilterPaginationInboundDto } from './dto/filter.pagination.inbound.dto/filter.pagination.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { InboundRepository } from './inbounds.repository';
import { InboundDocument } from './schemas/inbound.schema';

@Injectable()
export class InboundsService {
  constructor(private readonly inboundRepository: InboundRepository) {}

  async create(createInboundDto: CreateInboundDto): Promise<InboundDocument> {
    return await this.inboundRepository.create(createInboundDto);
  }

  async findByOption(
    filterPaginationInboundDto: FilterPaginationInboundDto,
  ): Promise<InboundDocument[]> {
    return await this.inboundRepository.findByOption(
      filterPaginationInboundDto,
    );
  }

  async updateInboundStatus(
    id: string,
    updateStatusInboundDto: UpdateStatusInboundDto,
  ): Promise<InboundDocument> {
    return await this.inboundRepository.updateInboundStatus(
      id,
      updateStatusInboundDto,
    );
  }

  async updateInbound(
    id: string,
    updateInboundDto: UpdateInboundDto,
  ): Promise<InboundDocument> {
    return await this.inboundRepository.updateInbound(id, updateInboundDto);
  }

  // Only NEW status can delete
  async softDelete(id: string): Promise<InboundDocument> {
    return await this.inboundRepository.softDelete(id);
  }
}
