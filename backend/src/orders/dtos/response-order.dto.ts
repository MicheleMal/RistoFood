import { State } from 'src/enums/states.enum';
import { OrderDishDto } from './order-dish.dto';
import { ResponseUserDto } from 'src/auth/dtos/response-user.dto';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseOrderDto {
  @IsNumber()
  @IsNotEmpty()
  id_order: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  n_person: number;

  @IsNumber()
  @IsNotEmpty()
  n_table: number;

  @IsEnum(State, {
    message: 'You must enter a role between admin and staff',
  })
  @IsNotEmpty()
  state: State;

  @ArrayNotEmpty()
  @IsNotEmpty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderDishDto)
  dishes?: OrderDishDto[];

  @IsNumber()
  @IsNotEmpty()
  price_total: number;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ResponseUserDto)
  user?: ResponseUserDto;
}
