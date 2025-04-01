import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/roles.enum';

@ApiSchema({
  name: "CreateUser"
})
export class CreateUserDto {

  @ApiProperty({
    name: "username",
    description: "Username for profile",
    type: "string"
  })
  @IsString({
    message: 'Enter a string format',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    name: "email",
    description: "Personal email to access the profile",
    type: "string"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: "password",
    description: "Password to access the profile",
    type: "string",
    minLength: 8,
  })
  @IsString({
    message: 'Enter a string format',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    name: "refresh_toke",
    description: "Refresh token",
    type: "string"
  })
  @IsString({
    message: 'Enter a string format',
  })
  @IsOptional()
  @IsNotEmpty()
  refresh_toke?: string
}
