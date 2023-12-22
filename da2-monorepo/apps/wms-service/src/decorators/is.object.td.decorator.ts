import { ValidationOptions, registerDecorator } from 'class-validator';
import { isObjectIdOrHexString } from 'mongoose';

export function isObjectId(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isObjectIdOrHexString(value);
        },
      },
    });
  };
}
