import { State } from "src/enums/states.enum"
import { OrderDishDto } from "./order-dish.dto"
import { ResponseUserDto } from "src/auth/dtos/response-user.dto"
import { ArrayNotEmpty, IsEnum, IsNumber, IsOptional, Min, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

export class ResponseOrderDto{

    @IsNumber()
    id_order: number

    @IsNumber()
    @Min(1)
    n_person: number

    @IsNumber()
    n_table: number

    @IsEnum(State)
    state: State

    @ArrayNotEmpty()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(()=>OrderDishDto)
    dishes?: OrderDishDto[]

    @IsNumber()
    price_total: number

    @IsOptional()
    @ValidateNested()
    @Type(()=>ResponseUserDto)
    user?: ResponseUserDto
}