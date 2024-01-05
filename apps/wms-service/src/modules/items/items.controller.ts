import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'src/pipes/is.object.id.pipe';
import { MapItemsAndInventory } from 'src/types/map.items.and.inventory';
import { CreateItemDto } from './dto/create.update.item.dto/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto/update.item.dto';
import { FilterPaginationItemDto } from './dto/filter.pagination.item.dto/filter.pagination.item.dto';
import { ItemDocument } from './item.schema';
import { ItemsService } from './items.service';
@ApiBearerAuth()
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto): Promise<ItemDocument> {
    return await this.itemsService.create(createItemDto);
  }

  @Post('search')
  async findByOption(
    @Body() filterPaginationItemDto: FilterPaginationItemDto,
  ): Promise<MapItemsAndInventory[]> {
    return await this.itemsService.findByOption(filterPaginationItemDto);
  }

  @Put('update/:id')
  async updateItem(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateItem: UpdateItemDto,
  ) {
    return await this.itemsService.updateItem(id, updateItem);
  }

  @Delete(':id')
  async softDelete(
    @Param('id', new IsObjectIdPipe()) id: string,
  ): Promise<ItemDocument> {
    return await this.itemsService.softDelete(id);
  }
}
