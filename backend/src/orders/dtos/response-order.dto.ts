import { State } from 'src/enums/states.enum';
import { OrderDishDto } from './order-dish.dto';
import { ResponseUserDto } from 'src/auth/dtos/response-user.dto';
import {
  ArrayNotEmpty,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseOrderDto {

  @ApiProperty({
    name: "Id order",
    type: "number"
  })
  @IsNumber()
  @IsNotEmpty()
  id_order: number;

  @ApiProperty({
    name: "Number person",
    type: "number"
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  n_person: number;

  @ApiProperty({
    name: "Table number",
    type: "number"
  })
  @IsNumber()
  @IsNotEmpty()
  n_table: number;

  @ApiProperty({
    name: "State",
    enumName: "State",
    enum: State
  })
  @IsEnum(State, {
    message: 'You must enter a role between admin and staff',
  })
  @IsNotEmpty()
  state: State;

  @ApiProperty({
    name: "Notes",
    type: "string"
  })
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty({
    name: "Date",
    type: Date
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({
    name: "Order Dish",
    type: [OrderDishDto]
  })
  @ArrayNotEmpty()
  @IsNotEmpty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderDishDto)
  dishes?: OrderDishDto[];

  @ApiProperty({
    name: "Cover charge",
    type: "number"
  })
  @IsNumber()
  @IsNotEmpty()
  cover_charge: number;

  @ApiProperty({
    name: "Price total",
    type: "number"
  })
  @IsNumber()
  @IsNotEmpty()
  price_total: number;

  @ApiProperty({
    name: "Response User",
    type: ResponseUserDto
  })
  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ResponseUserDto)
  user?: ResponseUserDto;
}
