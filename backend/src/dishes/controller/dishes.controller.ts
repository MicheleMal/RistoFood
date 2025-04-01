import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { DishesService } from '../service/dishes.service';
import { CreateDishDto } from '../dtos/create-dish.dto';
import { Dish } from '../dish.entity';
import { Category } from 'src/enums/categories.enum';
import { UpdateDishDto } from '../dtos/update-dish.dto';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { ResponseDishDto } from '../dtos/response-dish.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDeleteDto } from 'src/dto/response-delete.dto';

@ApiTags("Menu")
@Controller('menu')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  // Get all dishes
  @Get('/venue/:id_venue/all')
  @ApiOkResponse({
    type: [ResponseDishDto],
    description: "List of all dishes on the menu"
  })
  @ApiBadRequestResponse({
    description: "Invalid price range"
  })
  @ApiParam({
    type: Number,
    name: "id_venue",
    description: "Id venue"
  })
  @ApiQuery({name: "c", description: "Category dish", required: false, enum: Category})
  @ApiQuery({name: "min_p", description: "Minimum price", required: false})
  @ApiQuery({name: "max_p", description: "Maximun price", required: false})
  @ApiQuery({name: "page", description: "Page number for pagination", required: false })
  @ApiQuery({name: "limit", description: "", required: false})
  async getAllDishes(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Query('c') category?: Category,
    @Query('min_p') min_price?: number,
    @Query('max_p') max_price?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ResponseDishDto[]> {
    return this.dishesService.getAllDishes(id_venue, category, min_price, max_price, page, limit);
  }

  // Insert new dish
  @Post('/venue/:id_venue/insert')
  @ApiOkResponse({
    type: CreateDishDto,
    description: "New dish created successfully"
  })
  @ApiBody({
    type: CreateDishDto
  })
  @ApiParam({
    type: Number,
    name: "id_venue",
    description: "Id venue"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async insertNewDish(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Body(ValidationPipe) createDishDto: CreateDishDto,
  ): Promise<CreateDishDto> {
    return this.dishesService.insertNewDish(id_venue, createDishDto);
  }

  // Update dish
  @Patch('/venue/:id_venue/update/:id_dish')
  @ApiParam({
    name: "id_dish",
    type: Number,
    description: "Id Dish"
  })
  @ApiParam({
    name: "id_venue",
    type: Number,
    description: "Id venue"
  })
  @ApiBody({
    type: UpdateDishDto
  })
  @ApiOkResponse({
    type: ResponseDishDto,
    description: "Dish updated successfully"
  })
  @ApiNotFoundResponse({
    description: "No dish found"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async updateDish(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Param('id_dish', ParseIntPipe) id_dish: number,
    @Body(ValidationPipe) updateDishDto: UpdateDishDto,
  ): Promise<ResponseDishDto> {
    return this.dishesService.updateDish(id_venue, id_dish, updateDishDto);
  }

  @Delete('/venue/:id_venue/delete/:id_dish')
  @ApiParam({
    name: "id_venue",
    type: Number,
    description: "Id venue"
  })
  @ApiParam({
    name: "id_dish",
    type: Number,
    description: "Id dish"
  })
  @ApiOkResponse({
    type: ResponseDeleteDto,
    description: "Dish deleted successfully"
  })
  @ApiNotFoundResponse({
    description: "No dish found"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async deleteDish(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Param('id_dish', ParseIntPipe) id_dish: number
  ): Promise<ResponseDeleteDto> {
    return this.dishesService.deleteDish(id_venue, id_dish);
  }
}
