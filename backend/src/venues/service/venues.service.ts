import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from '../venue.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateVenueDto } from '../dto/create-venue.dto';
import { User } from 'src/users/user.entity';
import { ResponseVenueDto } from '../dto/response-venue.dto';
import { VenueUser } from '../venue-user.entity';
import { Role } from 'src/enums/roles.enum';
import { AddUserToVenueDto } from '../dto/add-user-venue.dto';
import { ResponseUserDto } from 'src/auth/dtos/response-user.dto';
import { UpdateVenueDto } from '../dto/update-venue.dto';
import { ResponseDeleteDto } from 'src/dto/response-delete.dto';

@Injectable()
export class VenuesService {

    constructor(
        @InjectRepository(Venue) private venueRepository: Repository<Venue>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(VenueUser) private venueUserRepository: Repository<VenueUser>,
    ){}

    async insertNewVenue(req: Request, createVenueDto: CreateVenueDto): Promise<ResponseVenueDto>{
        const {user_id} = req["user"]

        const user = await this.userRepository.findOne({
            where: {
                id: user_id
            }
        })

        try {
            const newVenue = await this.venueRepository.save(createVenueDto)
            await this.venueRepository.save(createVenueDto)
            const newVenueUser = this.venueUserRepository.create({
                role: Role.OWNER,
                venue: newVenue,
                user: user
            })
            this.venueUserRepository.save(newVenueUser)

            return {
                venue: newVenue,
                user: {
                    username: user.username
                },
                role: Role.OWNER
            }
        } catch (error) {
            if(error instanceof QueryFailedError){
                if(error["code"] === "ER_DUP_ENTRY"){
                    throw new ConflictException("Venue already registered")
                }
            }
        }
    }

    async addUserToVenue(id: number, addUserToVenueDto: AddUserToVenueDto): Promise <ResponseVenueDto>{
        const user = await this.userRepository.findOne({
            where: {
                email: addUserToVenueDto.email
            }
        })

        if(!user){
            throw new NotFoundException("User not found")
        }

        const venue = await this.venueRepository.findOne({
            where: {
                id: id
            }
        })

        const newVenueUser = this.venueUserRepository.create({
            user: user,
            venue: venue,
            role: addUserToVenueDto.role
        })

        await this.venueUserRepository.save(newVenueUser)

        return {
            venue: venue,
            user: {
                username: user.username
            },
            role: newVenueUser.role
        }
    }

    async getVenueById(id: number): Promise<ResponseVenueDto>{
        const venue = await this.venueRepository.findOne({
            where: {
                id: id
            }
        })
        return {
            venue: venue
        }
    }

    async getAllVenue(): Promise<ResponseVenueDto[]>{
        const venues = await this.venueRepository.find()

        return venues.map((venue)=>({
            venue: venue
        }))
    }

    async getUserToVenue(id_venue: number): Promise<{id: number, username: string, role: Role}[]>{
        const users = await this.venueUserRepository
        .createQueryBuilder('vUser')
        .innerJoinAndSelect("vUser.user", "u")
        .where("vUser.id_venue = :id_venue", {id_venue})
        .getMany()

        return users.map((user)=>({
            id: user.id,
            username: user.user.username,
            role: user.role
        }))
    }

    async updateVenue(id: number, updateVenueDto: UpdateVenueDto): Promise <ResponseVenueDto>{
        const updateVenue = await this.venueRepository.update(id, updateVenueDto)

        if(updateVenue.affected === 0){
            throw new NotFoundException("No venue found")
        }

        const venue = await this.venueRepository.findOne({
            where: {
                id: id
            }
        })

        return {
            venue: venue
        }
    }

    async updateRoleToVenue(id_venue: number, id_user: number, role: Role){
        const user = await this.venueUserRepository
        .createQueryBuilder()
        .update(VenueUser)
        .set( {role} )
        .where("venue_user.id_venue = :id_venue", {id_venue})
        .andWhere("venue_user.id_user = :id_user", {id_user})
        .execute()

        throw new HttpException("Role successfully updated", 200)
    }

    async deleteVenue(id: number): Promise<ResponseDeleteDto>{
        const deleteVenue = await this.venueRepository.delete(id)

        if(deleteVenue.affected === 0){
            throw new NotFoundException("No venue found")
        }

        return {
            message: "Venue successfully deleted",
            error: null,
            statusCode: 200
        }
    }

    async deleteUserFromVenue(id_venue: number, id_user: number): Promise<ResponseDeleteDto>{
        await this.venueUserRepository.
        createQueryBuilder()
        .delete()
        .from(VenueUser)
        .where("venue_user.id_venue = :id_venue", {id_venue})
        .andWhere("venue_user.id_user = :id_user", {id_user})
        .execute()
        
        return {
            message: "User successfully deleted from the venue",
            error: null,
            statusCode: 200
        }

    }

}
