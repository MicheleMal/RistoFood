import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { ResponseOrderDto } from '../dtos/response-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { responseDeleteDto } from 'src/dto/response-delete.dto';
import { State } from 'src/enums/states.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Insert new order
  @Post('insert')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async insertNewDish(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @Request() req: Request,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.insertNewOrder(createOrderDto, req);
  }

  // Get all order
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async getAllOrder(
    @Query('s') state?: State,
  ): Promise<ResponseOrderDto[]> {
    return this.ordersService.getAllOrder(state);
  }

  // Get orders by table number
  @Get('/table/:n_table')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async getOrderByTableNumber(
    @Param('n_table', ParseIntPipe) n_table: number,
  ): Promise<ResponseOrderDto[]> {
    return this.ordersService.getOrderByTableNumber(n_table);
  }

  // Update order (n_person, n_table, state)
  @Patch('update/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async updateOrder(
    @Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.updateOrder(updateOrderDto, id);
  }

  // Update order dish
  @Put('update/:id/dish/:id_dish')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async updateOrderDish(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_dish', ParseIntPipe) id_dish: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.updateOrderDish(id, id_dish, quantity);
  }

  // Delete order
  @Delete('delete/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<responseDeleteDto> {
    return this.ordersService.deleteOrder(id);
  }
}
