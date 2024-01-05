import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isObjectIdOrHexString } from 'mongoose';
import { BadRequestException } from 'src/exceptions/bad.request.exception';

@Injectable()
export class IsObjectIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isObjectIdOrHexString(value)) {
      throw new BadRequestException('Invalid Id');
    }
    return value;
  }
}
