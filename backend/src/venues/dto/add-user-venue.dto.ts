import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Role } from "src/enums/roles.enum";
import { User } from "src/users/user.entity";

export class AddUserToVenueDto{
    
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}