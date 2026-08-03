import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { DiscountType } from 'common/types';

export function IsValidDiscountAmount(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDiscountAmount',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: number, args: ValidationArguments) {
          const obj = args.object as any;
          if (obj.disscountType === DiscountType.percentage) {
            return typeof value === 'number' && value > 0 && value <= 100;
          }
          // fixed amount: just needs to be a positive number
          return typeof value === 'number' && value > 0;
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          return obj.disscountType === DiscountType.percentage
            ? 'disscountAmount must be between 1 and 100 for percentage discounts'
            : 'disscountAmount must be greater than 0';
        },
      },
    });
  };
}