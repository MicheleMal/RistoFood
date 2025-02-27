import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { User } from '../user.entity';
import { Type } from 'class-transformer';

export class ResponseUserUpdateDeleteDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  error?: string | null;

  @IsNumber()
  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => User)
  data?: User;
}
