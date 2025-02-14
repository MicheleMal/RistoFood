import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/enums/categories.enum"

export class ResponseDishDto{

    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    @IsEnum(Category)
    category: Category

}