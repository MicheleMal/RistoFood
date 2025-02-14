import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class ResponseUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEnum(Role, {
    message: 'You must enter a role between admin and staff',
  })
  @IsNotEmpty()
  role: Role;
}
