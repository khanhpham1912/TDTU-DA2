import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'src/pipes/is.object.id.pipe';
import { CreateOutboundDto } from './dto/create.update.outbound.dto/create.outbound.dto';
import { UpdateOutboundDto } from './dto/create.update.outbound.dto/update.outbound.dto';
import { FilterPaginationOutboundDto } from './dto/filter.pagination.outbound.dto/filter.pagination.outbound.dto';
import { UpdateStatusOutboundDto } from './dto/update.status.outbound.dto';
import { OutboundsService } from './outbounds.service';
import { OutboundDocument } from './schemas/outbound.schema';

@ApiBearerAuth()
@ApiTags('Outbounds')
@Controller('outbounds')
export class OutboundsController {
  constructor(private readonly outboundsService: OutboundsService) {}

  @Post('create')
  async create(
    @Body() createOutboundDto: CreateOutboundDto,
  ): Promise<OutboundDocument> {
    return await this.outboundsService.create(createOutboundDto);
  }

  @Post('search')
  async findByOption(
    @Body() filterPaginationOutboundDto: FilterPaginationOutboundDto,
  ): Promise<OutboundDocument[]> {
    return await this.outboundsService.findByOption(
      filterPaginationOutboundDto,
    );
  }

  @Put(':id')
  async updateInboundStatus(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateStatusOutboundDto: UpdateStatusOutboundDto,
  ): Promise<OutboundDocument> {
    return await this.outboundsService.updateInboundStatus(
      id,
      updateStatusOutboundDto,
    );
  }

  @Put('update/:id')
  async updateOutbound(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateOutboundDto: UpdateOutboundDto,
  ) {
    return await this.outboundsService.updateOutbound(id, updateOutboundDto);
  }

  @Delete(':id')
  async softDelete(
    @Param('id', new IsObjectIdPipe()) id: string,
  ): Promise<OutboundDocument> {
    return await this.outboundsService.softDelete(id);
  }
}
