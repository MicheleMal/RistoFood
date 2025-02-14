import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { OrderDishDto } from "./order-dish.dto";
import { Type } from "class-transformer";
import { State } from "src/enums/states.enum";

export class UpdateOrderDto{
    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    n_person?: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    n_table?: number

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(State,{
        message: 'You must enter a role between admin and staff',
    })
    state?: State

}