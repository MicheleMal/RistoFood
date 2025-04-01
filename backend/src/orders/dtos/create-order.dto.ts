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
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: "CreateOrder"
})
export class CreateOrderDto {
  @ApiPropertyOptional({
    name: "Number person",
    description: 'Number person at the table',
    type: "number",
    minimum: 1,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  n_person?: number;

  @ApiProperty({
    name: "Table number",
    description: 'Table number',
    type: "number"
  })
  @IsNumber()
  @IsNotEmpty()
  n_table: number;

  @ApiProperty({
    description: 'Cover charge',
    type: "number"
  })
  @IsNumber()
  @IsNotEmpty()
  cover_charge: number;

  @ApiPropertyOptional({
    name: "Total price",
    description: 'Total price of the order',
    type: "number"
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price_total?: number;

  @ApiPropertyOptional({
    name: "Order status",
    description: 'Order status',
    enum: State,
    default: State.WAIT,
    example: State.WAIT,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(State, {
    message: 'You must enter a role between admin and staff',
  })
  state?: State;

  @ApiPropertyOptional({
    name: "Notes",
    description: 'Additional notes to the order',
    type: "string"
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({
    name: "Order dates",
    description: 'Order dates',
    type: Date
  })
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @ApiProperty({
    name: "Order dish",
    description: 'List of dishes within the order',
    type: [OrderDishDto],
    isArray: true,
  })
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderDishDto)
  dishes: OrderDishDto[];

  @ApiPropertyOptional({
    name: "Id order",
    description: 'Unique id the order',
    type: "number"
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  id_order?: number;

  @ApiPropertyOptional({
    name: "Id user",
    description: 'Unique ID of the user who creates the order',
    type: "number"
  })
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  id_user?: number;
}
