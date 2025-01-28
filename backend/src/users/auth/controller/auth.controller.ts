import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    // Registrare nuovo utente
    @Post("register")
    register(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this.authService.register(createUserDto)
    }
    
    // Login 
    @Post("login")
    login(@Body(ValidationPipe) loginUserDto: LoginUserDto){
        return this.authService.login(loginUserDto)
    }

}
