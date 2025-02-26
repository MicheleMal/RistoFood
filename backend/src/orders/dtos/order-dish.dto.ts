import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@ApiSchema({
  name: "OrderDish"
})
export class OrderDishDto {
  @ApiProperty({
    description: 'Unique id the dish',
    minimum: 1,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_dish: number;

  @ApiPropertyOptional({
    description: 'Name dish',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Description dish',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Price dish',
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @IsNotEmpty()
  @IsOptional()
  single_price?: number;

  @ApiPropertyOptional({
    description: 'Quantity of the dish in the order',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
