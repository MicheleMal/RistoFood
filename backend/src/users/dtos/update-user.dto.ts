import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class UpdateUserDto {
  @IsString({
    message: 'Enter a string format',
  })
  @IsOptional()
  username?: string;

  @IsString({
    message: 'Enter a string format',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @IsOptional()
  password?: string;

  @IsEnum(Role, {
    message: 'You must enter a role between admin and staff',
  })
  @IsOptional()
  role?: Role;


}
