import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { AuthGuard } from '../../auth/guards/auth/auth.guard';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserProfileDto } from '../dtos/user-profile.dto';
import { ResponseUpdateUserDto } from '../dtos/response-update-user.dto';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { responseDeleteDto } from 'src/dto/response-delete.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get the user authenticated
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request): Promise<UserProfileDto> {
    return this.usersService.getProfile(req);
  }

  // Edit authenticated user information
  @UseGuards(AuthGuard)
  @Patch('update')
  updateUser(
    @Request() req: Request,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<ResponseUpdateUserDto> {
    return this.usersService.updateUser(req, updateUserDto);
  }

  // Delete authenticated user
  @UseGuards(AuthGuard)
  @Delete('delete')
  deleteUser(
    @Request() req: Request,
  ): Promise<responseDeleteDto> {
    return this.usersService.deleteUser(req);
  }
}
