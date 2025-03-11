import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { VenuesService } from '../service/venues.service';
import { CreateVenueDto } from '../dto/create-venue.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseVenueDto } from '../dto/response-venue.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { AddUserToVenueDto } from '../dto/add-user-venue.dto';
import { UpdateVenueDto } from '../dto/update-venue.dto';
import { IsEnum } from 'class-validator';

@ApiBearerAuth()
@Controller('venues')
export class VenuesController {

    constructor(private readonly venuesService: VenuesService){}

    // Insert new venue
    @UseGuards(AuthGuard)
    @Post('insert')
    async insertNewVenue(@Request() req: Request, @Body(ValidationPipe) createVenueDto: CreateVenueDto): Promise<ResponseVenueDto>{
        return this.venuesService.insertNewVenue(req, createVenueDto)
    }

    // Add user to venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Post('/:id/add/user')
    async addUserToVenue(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe)  addUserToVenueDto: AddUserToVenueDto
    ){
        return this.venuesService.addUserToVenue(id, addUserToVenueDto)
    }

    // Get venue by id
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Get('/:id')
    async getVenueById(@Param('id', ParseIntPipe) id: number){
        return this.venuesService.getVenueById(id)
    }

    // Get all venue
    @Get('all')
    async getAllVenue(){
        return this.venuesService.getAllVenue()
    }

    // List of all users added to the venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Get('/:id_venue/users')
    async getUserToVenue(@Param('id_venue', ParseIntPipe) id_venue: number){
        return this.venuesService.getUserToVenue(id_venue)
    }

    // Update venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Patch('update/:id')
    async updateVenue(@Param('id', ParseIntPipe) id: number, @Body() updateVenueDto: UpdateVenueDto){
        return this.venuesService.updateVenue(id, updateVenueDto)
    }

    // Update role user added to the venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Put(":id_venue/user/:id_user/role")
    async updateRoleToVenue(
        @Param('id_venue', ParseIntPipe) id_venue: number,
        @Param('id_user', ParseIntPipe) id_user: number,
        @Body('role') role: Role
    ){
        return this.venuesService.updateRoleToVenue(id_venue, id_user, role)
    }

    // Delete venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Delete('delete/:id')
    async deleteVenue(@Param('id', ParseIntPipe) id: number){
        return this.venuesService.deleteVenue(id)
    }

}
