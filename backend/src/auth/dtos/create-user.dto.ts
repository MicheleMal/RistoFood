import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @IsString({
    message: 'Enter a string format',
  })
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString({
    message: 'Enter a string format',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'You must enter a role between admin and staff',
  })
  @IsNotEmpty()
  role?: Role;

  @IsString({
    message: 'Enter a string format',
  })
  @IsOptional()
  @IsNotEmpty()
  refresh_toke?: string
}
