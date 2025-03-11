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
    description: "Username for profile",
  })
  @IsString({
    message: 'Enter a string format',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "Personal email to access the profile"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Password to access the profile",
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
    description: "Refresh token"
  })
  @IsString({
    message: 'Enter a string format',
  })
  @IsOptional()
  @IsNotEmpty()
  refresh_toke?: string
}
