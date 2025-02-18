import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload;
    } catch (error) {
      if(error instanceof TokenExpiredError){
        throw new UnauthorizedException('Jwt expired');
      }
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractToken(req: Request): string | undefined {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    return token;
  }
}
