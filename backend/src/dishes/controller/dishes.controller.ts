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

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  // Get all dishes
  @Get('all')
  getAllDishes(
    @Query('c') category?: Category,
    @Query('min_p') min_price?: number,
    @Query('max_p') max_price?: number,
  ): Promise<Dish[]> {
    return this.dishesService.getAllDishes(category, min_price, max_price);
  }

  // Insert new dish
  @Post('insert')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  insertNewDish(
    @Body(ValidationPipe) createDishDto: CreateDishDto,
  ): Promise<CreateDishDto> {
    return this.dishesService.insertNewDish(createDishDto);
  }

  // Update dish
  @Patch('update/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateDish(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateDishDto: UpdateDishDto,
  ) {
    return this.dishesService.updateDish(id, updateDishDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deleteDish(@Param('id', ParseIntPipe) id: number): Promise<{
    message: string;
    error: number | null;
    statusCode: number;
  }> {
    return this.dishesService.deleteDish(id);
  }
}
