import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, UpdateWriteOpResult } from 'mongoose';
import activeOption from 'src/config/active.config';
import { options } from 'src/config/plain.config';
import { Status } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { CreateInboundDto } from './dto/create.update.inbound.dto.ts/create.inbound.dto';
import { UpdateInboundDto } from './dto/create.update.inbound.dto.ts/update.inbound.dto';
import { FindingOptionInboundDto } from './dto/finding.option.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { Inbound, InboundDocument } from './inbound.schema';

@Injectable()
export class InboundsService {
  constructor(
    @InjectModel(Inbound.name) private readonly inboundModel: Model<Inbound>,
  ) {}

  async create(createInboundDto: CreateInboundDto): Promise<InboundDocument> {
    const newCreateInboundDto = plainToInstance(
      CreateInboundDto,
      createInboundDto,
      options,
    );
    try {
      return await this.inboundModel.create(newCreateInboundDto);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateInboundStatus(
    id: string,
    updateStatusInboundDto: UpdateStatusInboundDto,
  ): Promise<UpdateWriteOpResult> {
    const statusChange: string = updateStatusInboundDto.status;
    try {
      const inbound = await this.inboundModel.findById(id);
      if (inbound.status !== Status.New) {
        throw new BadRequestException('Only new accepted');
      }
      return await this.inboundModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        { status: statusChange },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async findByOption(
    findingOptionInboundDto: FindingOptionInboundDto,
  ): Promise<InboundDocument[]> {
    const newFindingOptionInboundDto = plainToInstance(
      FindingOptionInboundDto,
      findingOptionInboundDto,
      options,
    );
    try {
      return await this.inboundModel
        .find({
          active: activeOption,
          ...newFindingOptionInboundDto,
        })
        .exec();
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateInbound(
    id: string,
    updateInboundDto: UpdateInboundDto,
  ): Promise<InboundDocument> {
    const newUpdateInboundDto = plainToInstance(
      UpdateInboundDto,
      updateInboundDto,
      options,
    );
    try {
      return this.inboundModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        {
          items: newUpdateInboundDto,
        },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async softDelete(id: string): Promise<InboundDocument> {
    try {
      return this.inboundModel.findByIdAndUpdate(id, {
        active: false,
      });
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }
}
