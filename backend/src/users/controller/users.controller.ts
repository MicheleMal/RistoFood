import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { AuthGuard } from '../../auth/guards/auth/auth.guard';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserProfileDto } from '../dtos/user-profile.dto';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ResponseUserUpdateDeleteDto } from '../dtos/response-user.dto';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get the user authenticated
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOkResponse({
    type: UserProfileDto,
    description: "Personal profile"
  })
  @ApiNotFoundResponse({
    description: "No user found"
  })
  async getProfile(@Request() req: Request): Promise<UserProfileDto> {
    return this.usersService.getProfile(req);
  }

  // Edit authenticated user information
  @UseGuards(AuthGuard)
  @Patch('update')
  @ApiOkResponse({
    description: "User updated successfully"
  })
  @ApiNotFoundResponse({
    description: "No user found"
  })
  async updateUser(
    @Request() req: Request,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserUpdateDeleteDto> {
    return this.usersService.updateUser(req, updateUserDto);
  }

  // Delete authenticated user
  @UseGuards(AuthGuard)
  @Delete('delete')
  @ApiOkResponse({
    type: ResponseUserUpdateDeleteDto,
    description: "User deleted successfully"
  })
  @ApiNotFoundResponse({
    description: "No user found"
  })
  async deleteUser(
    @Request() req: Request,
  ): Promise<ResponseUserUpdateDeleteDto> {
    return this.usersService.deleteUser(req);
  }
}
