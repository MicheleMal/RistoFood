import { ApiProperty, ApiSchema } from "@nestjs/swagger"
import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/enums/categories.enum"

@ApiSchema({
    name: "CreateDish"
})
export class CreateDishDto{

    @ApiProperty({
        description: "Name dish for menu"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: "Description dish for menu"
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: "Price dish for menu"
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    })
    @IsNotEmpty()
    price: number

    @ApiProperty({
        description: "Category dish for menu",
        enum: Category,
        example: Category.PRIMO
    })
    @IsEnum(Category, {
        message: "You must enter a valid category"
    })
    @IsNotEmpty()
    category: Category

}