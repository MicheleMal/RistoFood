import { IsDecimal, IsEnum, IsNumber, IsString } from "class-validator"
import { Category } from "src/enums/categories.enum"

export class CreateDishDto{

    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    })
    price: number

    @IsEnum(Category, {
        message: "You must enter a valid category"
    })
    category: Category

}