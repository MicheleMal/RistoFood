import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderDishDto {
  @IsNotEmpty()
  @IsNumber()
  id_dish: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @IsNotEmpty()
  @IsOptional()
  single_price?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
