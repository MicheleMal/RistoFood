import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { VenuesService } from '../service/venues.service';
import { CreateVenueDto } from '../dto/create-venue.dto';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ResponseVenueDto } from '../dto/response-venue.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { AddUserToVenueDto } from '../dto/add-user-venue.dto';
import { UpdateVenueDto } from '../dto/update-venue.dto';
import { IsEnum } from 'class-validator';
import { ResponseDeleteDto } from 'src/dto/response-delete.dto';

@ApiBearerAuth()
@Controller('venues')
export class VenuesController {

    constructor(private readonly venuesService: VenuesService){}

    // Insert new venue
    @UseGuards(AuthGuard)
    @Post('insert')
    @ApiBody({
        type: CreateVenueDto
    })
    @ApiOkResponse({
        type: ResponseVenueDto,
        description: "Insert new venue"
    })
    @ApiConflictResponse({
        description: "Venue already registered"
      })
    async insertNewVenue(@Request() req: Request, @Body(ValidationPipe) createVenueDto: CreateVenueDto): Promise<ResponseVenueDto>{
        return this.venuesService.insertNewVenue(req, createVenueDto)
    }

    // Add user to venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Post('/:id/add/user')
    @ApiBody({
        type: AddUserToVenueDto
    })
    @ApiParam({
        name: "id",
        type: Number,
        description: "Id venue"
      })
    @ApiOkResponse({
        type: ResponseVenueDto,
        description: "Add user to venue"
    })
    @ApiNotFoundResponse({
        description: "User not found"
    })
    async addUserToVenue(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe)  addUserToVenueDto: AddUserToVenueDto
    ): Promise <ResponseVenueDto>{
        return this.venuesService.addUserToVenue(id, addUserToVenueDto)
    }

    // Get venue by id
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Get('/:id')
    @ApiParam({
        name: "id",
        type: Number,
        description: "Id venue"
      })
    @ApiOkResponse({
        type: ResponseVenueDto,
        description: "Get venue by id"
    })
    async getVenueById(@Param('id', ParseIntPipe) id: number): Promise<ResponseVenueDto>{
        return this.venuesService.getVenueById(id)
    }

    // Get all venue
    @Get('all')
    @ApiOkResponse({
        type: [ResponseVenueDto],
        description: "Get all venue"
    })
    async getAllVenue(): Promise<ResponseVenueDto[]>{
        return this.venuesService.getAllVenue()
    }

    // List of all users added to the venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Get('/:id_venue/users')
    @ApiParam({
        name: "id_venue",
        type: Number,
        description: "Id venue"
      })
    @ApiOkResponse({
        description: "List of all users added to the venue"
    })
    async getUserToVenue(@Param('id_venue', ParseIntPipe) id_venue: number): Promise<{id: number, username: string, role: Role}[]>{
        return this.venuesService.getUserToVenue(id_venue)
    }

    // Update venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Patch('update/:id')
    @ApiParam({
        name: "id",
        type: Number,
        description: "Id venue"
    })
    @ApiBody({
        type: UpdateVenueDto
    })
    @ApiOkResponse({
        type: ResponseVenueDto,
        description: "Update venue"
    })
    @ApiNotFoundResponse({
        description: "No venue found"
    })
    async updateVenue(@Param('id', ParseIntPipe) id: number, @Body() updateVenueDto: UpdateVenueDto): Promise <ResponseVenueDto>{
        return this.venuesService.updateVenue(id, updateVenueDto)
    }

    // Update role user added to the venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Put(":id_venue/user/:id_user/role")
    @ApiParam({
        name: "id_venue",
        type: Number,
        description: "Id venue"
    })
    @ApiParam({
        name: "id_user",
        type: Number,
        description: "Id user"
    })
    //TODO: Scrivere dto e mettere tipo di ritorno
    @ApiOkResponse({
        description: "Update role user added to the venue"
    })
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
    @ApiParam({
        name: "id",
        type: Number,
        description: "Id venue"
      })
    @ApiOkResponse({
        type: ResponseDeleteDto,
        description: "Delete venue"
    })
    @ApiNotFoundResponse({
        description: "No venue found"
    })
    async deleteVenue(@Param('id', ParseIntPipe) id: number): Promise<ResponseDeleteDto>{
        return this.venuesService.deleteVenue(id)
    }

    // Delete a user from a venue
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @Delete('delete/:id_venue/delete/user/:id_user')
    @ApiParam({
        name: "id_venue",
        type: Number,
        description: "Id venue"
      })
      @ApiParam({
        name: "id_user",
        type: Number,
        description: "id user"
      })
    @ApiOkResponse({
        type: ResponseDeleteDto,
        description: "Delete a user from a venue"
    })
    async deleteUserFromVenue(
        @Param('id_venue', ParseIntPipe) id_venue: number,
        @Param('id_user', ParseIntPipe) id_user: number
    ): Promise<ResponseDeleteDto>{
        return this.venuesService.deleteUserFromVenue(id_venue, id_user)
    }

}
