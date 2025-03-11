import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class ResponseUserDto {

  @ApiProperty({
    description: "Username"
})
  @IsString()
  @IsNotEmpty()
  username: string;

}
