import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'src/pipes/is.object.id.pipe';
import { CreateItemDto } from './dto/create.update.item.dto.ts/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto.ts/update.item.dto';
import { FindingOptionItemDto } from './dto/finding.option.item.dto';
import { ItemDocument } from './item.schema';
import { ItemsService } from './items.service';
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto): Promise<ItemDocument> {
    return this.itemsService.create(createItemDto);
  }

  @Post('search')
  async findByOption(
    @Body() findingOptionItemDto: FindingOptionItemDto,
  ): Promise<ItemDocument[]> {
    return this.itemsService.findByOption(findingOptionItemDto);
  }

  @Put('update/:id')
  async updateItem(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateItem: UpdateItemDto,
  ) {
    return this.itemsService.updateInbound(id, updateItem);
  }

  @Delete(':id')
  async softDelete(
    @Param('id', new IsObjectIdPipe()) id: string,
  ): Promise<ItemDocument> {
    return this.itemsService.softDelete(id);
  }
}
