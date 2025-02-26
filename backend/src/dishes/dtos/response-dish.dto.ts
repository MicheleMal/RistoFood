import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/enums/categories.enum"

export class ResponseDishDto{

    @ApiProperty({
        description: "Unique id the dish"
    })
    @IsNumber()
    @IsNotEmpty()
    id: number

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
    @IsNumber()
    @IsNotEmpty()
    price: number

    @ApiProperty({
        description: "Category dish for menu",
        enum: Category,
        example: Category.PRIMO
    })
    @IsNotEmpty()
    @IsEnum(Category)
    category: Category

}