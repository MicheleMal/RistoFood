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
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDeleteDto } from 'src/dto/response-delete.dto';

@ApiTags("Menu")
@Controller('menu')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  // Get all dishes
  @Get('all')
  @ApiOkResponse({
    description: "List of all dishes on the menu"
  })
  @ApiBadRequestResponse({
    description: "Invalid price range"
  })
  @ApiQuery({name: "c", description: "Category dish", required: false, enum: Category})
  @ApiQuery({name: "min_p", description: "Minimum price", required: false})
  @ApiQuery({name: "max_p", description: "Maximun price", required: false})
  @ApiQuery({name: "page", description: "Page number for pagination", required: false })
  @ApiQuery({name: "limit", description: "", required: false})
  async getAllDishes(
    @Query('c') category?: Category,
    @Query('min_p') min_price?: number,
    @Query('max_p') max_price?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<Dish[]> {
    return this.dishesService.getAllDishes(category, min_price, max_price, page, limit);
  }

  // Insert new dish
  @Post('insert')
  @ApiOkResponse({
    description: "New dish created successfully"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async insertNewDish(
    @Body(ValidationPipe) createDishDto: CreateDishDto,
  ): Promise<CreateDishDto> {
    return this.dishesService.insertNewDish(createDishDto);
  }

  // Update dish
  @Patch('update/:id')
  @ApiOkResponse({
    description: "Dish updated successfully"
  })
  @ApiNotFoundResponse({
    description: "No dish found"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async updateDish(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateDishDto: UpdateDishDto,
  ): Promise<ResponseDishDto> {
    return this.dishesService.updateDish(id, updateDishDto);
  }

  @Delete('delete/:id')
  @ApiOkResponse({
    description: "Dish deleted successfully"
  })
  @ApiNotFoundResponse({
    description: "No dish found"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async deleteDish(@Param('id', ParseIntPipe) id: number): Promise<ResponseDeleteDto> {
    return this.dishesService.deleteDish(id);
  }
}
