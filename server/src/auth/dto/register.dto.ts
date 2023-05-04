import {
  IsEmail,
  IsInt,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { GenderType } from '../../utils/gender.types';

export class RegisterDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  gender: GenderType;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  // @IsInt()
  // @Min(0)
  age: number;
  city?: string;
  university: string;
}
