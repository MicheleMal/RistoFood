import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@ApiSchema({
  name: "OrderDish"
})
export class OrderDishDto {
  @ApiProperty({
    name: "Id dish",
    description: 'Unique id the dish',
    type: "number",
    minimum: 1,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_dish: number;

  @ApiPropertyOptional({
    name: "Name dish",
    description: 'Name dish',
    type: "string",
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    name: "Description dish",
    description: 'Description dish',
    type: "string",
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    name: "Price dish",
    description: 'Price dish',
    type: "number",
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @IsNotEmpty()
  @IsOptional()
  single_price?: number;

  @ApiPropertyOptional({
    name: "Quantity",
    description: 'Quantity of the dish in the order',
    type: "number",
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
