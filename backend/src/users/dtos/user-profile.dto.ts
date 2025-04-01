import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class UserProfileDto {

  @ApiProperty({
    type: "string",
    name: "Username",
    description: "Unique username"
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "User email",
    type: "string",
    name: "Email"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User role",
    name: "Role",
    enum: Role,
    enumName: "Role"
  })
  @IsEnum(Role, {
    message: 'You must enter a role between admin and staff',
  })
  role: Role;
}
