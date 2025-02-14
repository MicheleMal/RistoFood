import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { IsNull } from "typeorm"

export class responseDeleteDto{

    @IsString()
    @IsNotEmpty()
    message: string
    
    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    error: number | null

    @IsNotEmpty()
    @IsNumber()
    statusCode: number
}