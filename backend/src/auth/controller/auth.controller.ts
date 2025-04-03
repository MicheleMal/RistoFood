import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { AuthGuard } from '../guards/auth/auth.guard';
import { ResponseTokenDto } from '../dtos/response-token.dto';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  @ApiOkResponse({
    description: "User registered successfully"
  })
  @ApiConflictResponse({
    description: "Email already registered"
  })
  @ApiBody({
    type: CreateUserDto
  })
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    return this.authService.register(createUserDto);
  }

  // Login user
  @Post('login')
  @ApiCreatedResponse({
    description: "Login successfully"
  })
  @ApiUnauthorizedResponse({
    description: "Incorrect email or password"
  })
  @ApiBody({
    type: LoginUserDto
  })
  async login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<ResponseTokenDto> {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh')
  @ApiBody({
    type: RefreshTokenDto
  })
  @ApiOkResponse({
    description: "Refresh token"
  })
  @ApiUnauthorizedResponse({
    description: "Incorrect email or password"
  })
  async refresh(@Body(ValidationPipe) refreshTokenDto: RefreshTokenDto): Promise<ResponseTokenDto>{
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Post('logout')
  @ApiOkResponse({
    description: "Successfully logout"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async logout(@Request() req: Request): Promise<{message: string}>{
    return this.authService.logout(req)
  }
}
