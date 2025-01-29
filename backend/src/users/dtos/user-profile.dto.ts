import { IsEmail, IsEnum, IsString } from "class-validator"
import { Role } from "src/enums/roles.enum"

export class UserProfileDto{

    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsEnum(Role)
    role: Role
}