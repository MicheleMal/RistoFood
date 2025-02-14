import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/enums/categories.enum"

export class CreateDishDto{

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    })
    @IsNotEmpty()
    price: number

    @IsEnum(Category, {
        message: "You must enter a valid category"
    })
    @IsNotEmpty()
    category: Category

}