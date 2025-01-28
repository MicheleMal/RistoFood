import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString({
    message: 'Enter a string format',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;

  @IsOptional()
  @IsEnum(Role, {
    message: "You must enter a role between admin and staff"
  })
  // @Transform(({value})=>value ?? Role.STAFF)
  role: Role;
}
