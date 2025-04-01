import { ApiProperty, ApiSchema } from "@nestjs/swagger"
import { IsDecimal, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/enums/categories.enum"

@ApiSchema({
    name: "CreateDish"
})
export class CreateDishDto{

    @ApiProperty({
        name: "name",
        description: "Name dish for menu",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        name: "description",
        description: "Description dish for menu",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        name: "price",
        description: "Price dish for menu",
        type: "number"
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    })
    @IsNotEmpty()
    price: number

    @ApiProperty({
        name: "category",
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