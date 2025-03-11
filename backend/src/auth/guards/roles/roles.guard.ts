import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/roles.enum';
import { VenueUser } from 'src/venues/venue-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {

  // reflector permette di leggere i metadati impostati con SetMetaData
  constructor(
    private reflector: Reflector,
    @InjectRepository(VenueUser) private venueUserRepository: Repository<VenueUser>,
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    // Ottieni i ruoli dalla route 
    const requiredRoles = this.reflector.get<Role[]>("roles", context.getHandler())

    if(!requiredRoles){
      return true
    }

    const request = context.switchToHttp().getRequest()
    const {user_id} = request.user

    const id_venue = request.params.id || request.params.id_venue

    const user = await this.venueUserRepository
    .createQueryBuilder("vUser")
    .innerJoinAndSelect("vUser.user", "u")
    .innerJoin("vUser.venue", "v")
    .where("u.id = :user_id", {user_id})
    .andWhere("v.id = :id_venue", {id_venue})
    .getOne()

    if(!requiredRoles.includes(user.role)){
      throw new ForbiddenException("Insufficiente permissions")
    }

    return true

  }
}
