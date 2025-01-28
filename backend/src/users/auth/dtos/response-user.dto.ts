import { IsEnum, IsString } from "class-validator"
import { Role } from "src/enums/roles.enum"

export class ResponseUserDto{

    @IsString()
    username: string

    @IsEnum(Role)
    role: Role

}