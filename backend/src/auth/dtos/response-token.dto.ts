import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResponseTokenDto {
  @ApiPropertyOptional({
    description: 'Token for authentication',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  access_token?: string;

  @ApiPropertyOptional({
    description: 'Refresh token',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  refresh_token?: string;
}
