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
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Insert new order
  @Post('insert')
  @ApiResponse({
    status: 201,
    description: "New order created"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async insertNewDish(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @Request() req: Request,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.insertNewOrder(createOrderDto, req);
  }

  // Get all order
  @Get('all')
  @ApiResponse({
    status: 200,
    description: "List of all orders"
  })
  @ApiQuery({name: "s", description: "State order", required: false, enum: State})
  @ApiQuery({name: "page", description: "Page number for pagination", required: false })
  @ApiQuery({name: "limit", description: "", required: false})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async getAllOrder(
    @Query('s') state?: State,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ResponseOrderDto[]> {
    return this.ordersService.getAllOrder(state, page, limit);
  }

  // Get orders by table number
  @Get('/table/:n_table')
  @ApiResponse({
    status: 200,
    description: "List of all orders for a specific table"
  })
  @ApiResponse({
    status: 404,
    description: "No orders found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async getOrderByTableNumber(
    @Param('n_table', ParseIntPipe) n_table: number,
  ): Promise<ResponseOrderDto[]> {
    return this.ordersService.getOrderByTableNumber(n_table);
  }

  // Update order (n_person, n_table, state)
  @Patch('update/:id')
  @ApiResponse({
    status: 200,
    description: "Order successfully modified"
  })
  @ApiResponse({
    status: 404,
    description: "No order found"
  })
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
  @ApiResponse({
    status: 200,
    description: "Order successfully modified"
  })
  @ApiResponse({
    status: 404,
    description: "No dish or order found"
  })
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
  @ApiResponse({
    status: 200,
    description: "Dish deleted successfully"
  })
  @ApiResponse({
    status: 404,
    description: "No order found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<responseDeleteDto> {
    return this.ordersService.deleteOrder(id);
  }

  // Get daily stats
  @Get("stats/daily")
  @ApiResponse({
    status: 200,
    description: "List of daily statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getDailyStats(){
    return this.ordersService.getDailyStats()
  }

  // Get monthly stats
  @Get("stats/monthly")
  @ApiResponse({
    status: 200,
    description: "List of monthly statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getMonthlyStats(){
    return this.ordersService.getMonthlyStats()
  }

  // Get annual stats
  @Get("stats/annual")
  @ApiResponse({
    status: 200,
    description: "List of annual statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAnnualStats(){
    return this.ordersService.getAnnualStats()
  }

  @Get("stats/top-dishes")
  @ApiResponse({
    status: 200,
    description: "Ranking of the most ordered dishes"
  })
  @ApiQuery({name: "top", description: "Top of the dishes to show", required: false})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async rankingOrdersDishes(@Query("top") top?: number){
    return this.ordersService.rankingOrdersDishes(top)
  }
}
