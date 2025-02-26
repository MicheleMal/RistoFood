import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { AuthGuard } from '../guards/auth/auth.guard';
import { ResponseTokenDto } from '../dtos/response-token.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  @ApiResponse({
    status: 201,
    description: "User registered successfully"
  })
  @ApiResponse({
    status: 409,
    description: "Email already registered"
  })
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    return this.authService.register(createUserDto);
  }

  // Login user
  @Post('login')
  @ApiResponse({
    status: 200,
    description: "Login successfully"
  })
  @ApiResponse({
    status: 401,
    description: "Incorrect email or password"
  })
  async login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<ResponseTokenDto> {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh')
  @ApiResponse({
    status: 200,
    description: "Refresh token"
  })
  @ApiResponse({
    status: 401,
    description: "Incorrect email or password"
  })
  async refresh(@Body('token') token: string, @Body('id') id: number): Promise<ResponseTokenDto>{
    return this.authService.refreshToken(id, token)
  }

  @Post('logout')
  @ApiResponse({
    status: 200,
    description: "Successfully logout"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async logout(@Request() req: Request): Promise<{message: string}>{
    return this.authService.logout(req)
  }
}
