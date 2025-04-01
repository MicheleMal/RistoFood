import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class ResponseUserDto {

  @ApiProperty({
    name: "username",
    description: "Username",
    type: "string"
})
  @IsString()
  @IsNotEmpty()
  username: string;

}
