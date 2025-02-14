import { ArrayNotEmpty, IsEnum, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { OrderDishDto } from "./order-dish.dto";
import { Type } from "class-transformer";
import { State } from "src/enums/states.enum";

export class UpdateOrderDto{
    
    @IsOptional()
    @IsNumber()
    n_person?: number

    @IsOptional()
    @IsNumber()
    n_table?: number

    @IsOptional()
    @IsEnum(State)
    state?: State

}