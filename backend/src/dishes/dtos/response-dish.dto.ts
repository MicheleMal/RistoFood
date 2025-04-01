import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/enums/categories.enum"

export class ResponseDishDto{

    @ApiProperty({
        name: "id",
        description: "Unique id the dish",
        type: "string"
    })
    @IsNumber()
    @IsNotEmpty()
    id: number

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
    @IsNumber()
    @IsNotEmpty()
    price: number

    @ApiProperty({
        name: "category",
        description: "Category dish for menu",
        enum: Category,
        example: Category.PRIMO
    })
    @IsNotEmpty()
    @IsEnum(Category)
    category: Category

}