import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  // reflector permette di leggere i metadati impostati con SetMetaData
  constructor(private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    // Ottieni i ruoli dalla route 
    const requiredRoles = this.reflector.get<Role[]>("roles", context.getHandler())

    if(!requiredRoles){
      return true
    }

    const request = context.switchToHttp().getRequest()
    const {role} = request.user

    return requiredRoles.includes(role)

  }
}
