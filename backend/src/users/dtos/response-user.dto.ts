import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { User } from '../user.entity';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseUserUpdateDeleteDto {

  @ApiProperty({
    name: "Message",
    description: "Message",
    type: "string",
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    name: "Error",
    description: "Description error",
    type: "string",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  error?: string | null;

  @ApiProperty({
    name: "Status code",
    description: "Status code",
    type: "number",
  })
  @IsNumber()
  @IsNotEmpty()
  statusCode: number;

  @ApiPropertyOptional({
    name: "Data",
    description: "User deleted",
    type: User,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => User)
  data?: User;
}
