import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/enums/roles.enum";

@ApiSchema({
    name: "UpdateRole"
})
export class UpdateRoleDto{

    @ApiProperty({
        description: "Enter the name of the user whose role is to be changed",
        type: "string"
    })
    @IsString({
        message: "Enter a string format"
    })
    @IsNotEmpty()
    username: string

    @ApiProperty({
        description: "New role to assign to the user",
        enum: Role,
        enumName: "Role"
    })
    @IsEnum(Role, {
        message: "You must enter a role between admin and staff"
    })
    @IsNotEmpty()
    role: Role

}