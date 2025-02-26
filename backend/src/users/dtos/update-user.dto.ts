import { ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/roles.enum';

@ApiSchema({
  name: "UpdateUser"
})
export class UpdateUserDto {

  @ApiPropertyOptional({
    description: "Username"
  })
  @IsString({
    message: 'Enter a string format',
  })
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: "Password"
  })
  @IsString({
    message: 'Enter a string format',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    description: "Role",
    enum: Role
  })
  @IsEnum(Role, {
    message: 'You must enter a role between admin and staff',
  })
  @IsNotEmpty()
  @IsOptional()
  role?: Role;
}
