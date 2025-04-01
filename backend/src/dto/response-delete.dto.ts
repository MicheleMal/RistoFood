import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class ResponseDeleteDto{

    @ApiProperty({
        type: "string",
        name: "message",
        description: "Message"
    })
    @IsString()
    @IsNotEmpty()
    message: string
    
    @ApiProperty({
        type: "number",
        name: "error",
        description: "Description error or null"
    })
    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    error: number | null

    @ApiProperty({
        description: "Status code",
        type: "number",
        name: "message"
    })
    @IsNotEmpty()
    @IsNumber()
    statusCode: number
}