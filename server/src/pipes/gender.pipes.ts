import { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ArgumentMetadata } from '@nestjs/common/interfaces';
import { RegisterDto } from '../auth/dto/register.dto';

export class GenderValidate implements PipeTransform {
  transform(value: RegisterDto, meta: ArgumentMetadata) {
    if (meta.type !== 'body') return value;
    if (value.gender !== 'female' && value.gender !== 'male')
      throw new BadRequestException('Invalid format gender');
    return value;
  }
}
