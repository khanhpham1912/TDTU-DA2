import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateWriteOpResult } from 'mongoose';
import { IsObjectIdPipe } from 'src/pipes/is.object.id.pipe';
import { CreateInboundDto } from './dto/create.update.inbound.dto.ts/create.inbound.dto';
import { UpdateInboundDto } from './dto/create.update.inbound.dto.ts/update.inbound.dto';
import { FindingOptionInboundDto } from './dto/finding.option.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { InboundDocument } from './inbound.schema';
import { InboundsService } from './inbounds.service';
@ApiTags('Inbounds')
@Controller('inbounds')
export class InboundsController {
  constructor(private readonly inboundsService: InboundsService) {}

  @Post('create')
  async create(
    @Body() createInboundDto: CreateInboundDto,
  ): Promise<InboundDocument> {
    return this.inboundsService.create(createInboundDto);
  }

  // TODO: pagination
  // TODO: DELETE
  // TODO: can update if new

  @Post('search')
  async findByOption(
    @Body() findingOptionInboundDto: FindingOptionInboundDto,
  ): Promise<InboundDocument[]> {
    return this.inboundsService.findByOption(findingOptionInboundDto);
  }

  // ! Only New accepted
  @Put(':id')
  async updateInboundStatus(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateStatusInboundDto: UpdateStatusInboundDto,
  ): Promise<UpdateWriteOpResult> {
    return this.inboundsService.updateInboundStatus(id, updateStatusInboundDto);
  }

  @Put('update/:id')
  async updateInbound(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateInbound: UpdateInboundDto,
  ) {
    return this.inboundsService.updateInbound(id, updateInbound);
  }

  @Delete(':id')
  async softDelete(
    @Param('id', new IsObjectIdPipe()) id: string,
  ): Promise<InboundDocument> {
    return this.inboundsService.softDelete(id);
  }
}
