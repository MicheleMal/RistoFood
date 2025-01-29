import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"
import { User } from "../user.entity"

export class ResponseUpdateUserDto{

    @IsString()
    message: string

    @IsOptional()
    @IsString()
    error?: string | null

    @IsNumber()
    statusCode: number

    data: User
}