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
    description: 'Number person at the table',
    minimum: 1,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  n_person?: number;

  @ApiProperty({
    description: 'Table number',
  })
  @IsNumber()
  @IsNotEmpty()
  n_table: number;

  @ApiProperty({
    description: 'Cover charge',
  })
  @IsNumber()
  @IsNotEmpty()
  cover_charge: number;

  @ApiPropertyOptional({
    description: 'Total price of the order',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price_total?: number;

  @ApiPropertyOptional({
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
    description: 'Additional notes to the order',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({
    description: 'Order dates',
  })
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @ApiProperty({
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
    description: 'Unique id the order',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  id_order?: number;

  @ApiPropertyOptional({
    description: 'Unique ID of the user who creates the order',
  })
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  id_user?: number;
}
