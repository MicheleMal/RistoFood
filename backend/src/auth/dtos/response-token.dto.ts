import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResponseTokenDto {
  @ApiPropertyOptional({
    name: "access_token",
    description: 'Token for authentication',
    type: "string"
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  access_token?: string;

  @ApiPropertyOptional({
    name: "refresh token",
    description: 'Refresh token',
    type: "string"
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  refresh_token?: string;
}
