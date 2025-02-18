import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class ResponseTokenDto{
    
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    access_token?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    refresh_token?: string
}