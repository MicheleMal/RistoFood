import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { State } from 'src/enums/states.enum';
import { Order } from '../order.entity';
import { Type } from 'class-transformer';
import { OrderDishDto } from './order-dish.dto';

export class CreateOrderDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  n_person?: number;

  @IsNumber()
  @IsNotEmpty()
  n_table: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price_total?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(State, {
    message: 'You must enter a role between admin and staff',
  })
  state?: State;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  notes?: string

  @IsNotEmpty()
  @IsOptional()
  @Type(()=>Date)
  @IsDate()
  date?: Date

  @ArrayNotEmpty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderDishDto)
  dishes: OrderDishDto[];

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  id_order?: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  id_user?: number;
}
