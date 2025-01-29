import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    return this.authService.register(createUserDto);
  }

  // Login user
  @Post('login')
  login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<{ token: string }> {
    return this.authService.login(loginUserDto);
  }
}
