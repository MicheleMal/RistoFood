import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Role } from "src/enums/roles.enum";
import { User } from "src/users/user.entity";

@ApiSchema({
    name: "AddUserToVenue"
})
export class AddUserToVenueDto{
    
    @ApiProperty({
        description: "Email of the user to add",
        type: "string"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: "Role to add to user",
        enumName: "Role",
        enum: Role,
        example: Role.STAFF
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}