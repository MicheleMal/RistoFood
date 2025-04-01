import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@ApiSchema({
  name: "LoginUser"
})
export class LoginUserDto {

  @ApiProperty({
    name: "email",
    description: "Email to access the profile",
    type: "string"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: "password",
    description: "Password to access the profile",
    type: "string",
    minLength: 8
  })
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @IsNotEmpty()
  password: string;
}
