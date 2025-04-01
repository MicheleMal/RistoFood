import { ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@ApiSchema({
  name: "UpdateUser"
})
export class UpdateUserDto {

  @ApiPropertyOptional({
    description: "Username",
    type: "string"
  })
  @IsString({
    message: 'Enter a string format',
  })
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: "Password",
    type: "string"
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
}
