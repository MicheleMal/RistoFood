import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class ResponseDeleteDto{

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