import { ArrayNotEmpty, IsArray, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, Min, ValidateNested } from "class-validator"
import { State } from "src/enums/states.enum"
import { Order } from "../order.entity"
import { Type } from "class-transformer"
import { OrderDishDto } from "./order-dish.dto"

export class CreateOrderDto{

    // @IsNumber()
    @IsNumber()
    @Min(1)
    n_person: number

    @IsNumber()
    n_table: number

    @IsOptional()
    @IsNumber()
    price_total?: number

    @IsOptional()
    @IsEnum(State)
    state?: State

    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(()=>OrderDishDto)
    dishes: OrderDishDto[]

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    id_order?: number
    
    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    id_user?: number

}