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
import { State } from 'src/enums/states.enum';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ResponseDeleteDto } from 'src/dto/response-delete.dto';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Insert new order
  @Post('insert')
  @ApiCreatedResponse({
    description: "New order created"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async insertNewDish(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @Request() req: Request,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.insertNewOrder(createOrderDto, req);
  }

  // Get all order
  @Get('all')
  @ApiOkResponse({
    description: "List of all orders"
  })
  @ApiQuery({name: "s", description: "State order", required: false, enum: State})
  @ApiQuery({name: "page", description: "Page number for pagination", required: false })
  @ApiQuery({name: "limit", description: "", required: false})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async getAllOrder(
    @Query('s') state?: State,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ResponseOrderDto[]> {
    return this.ordersService.getAllOrder(state, page, limit);
  }

  // Get orders by table number
  @Get('/table/:n_table')
  @ApiOkResponse({
    description: "List of all orders for a specific table"
  })
  @ApiNotFoundResponse({
    description: "No orders found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async getOrderByTableNumber(
    @Param('n_table', ParseIntPipe) n_table: number,
  ): Promise<ResponseOrderDto[]> {
    return this.ordersService.getOrderByTableNumber(n_table);
  }

  // Update order (n_person, n_table, state)
  @Patch('update/:id')
  @ApiOkResponse({
    description: "Order successfully modified"
  })
  @ApiNotFoundResponse({
    description: "No order found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async updateOrder(
    @Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.updateOrder(updateOrderDto, id);
  }

  // Update order dish
  @Put('update/:id/dish/:id_dish')
  @ApiOkResponse({
    description: "Order successfully modified"
  })
  @ApiNotFoundResponse({
    description: "No dish or order found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async updateOrderDish(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_dish', ParseIntPipe) id_dish: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.updateOrderDish(id, id_dish, quantity);
  }

  // Delete order
  @Delete('delete/:id')
  @ApiOkResponse({
    description: "Dish deleted successfully"
  })
  @ApiNotFoundResponse({
    description: "No order found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDeleteDto> {
    return this.ordersService.deleteOrder(id);
  }

  // Get daily stats
  @Get("stats/daily")
  @ApiOkResponse({
    description: "List of daily statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async getDailyStats(){
    return this.ordersService.getDailyStats()
  }

  // Get monthly stats
  @Get("stats/monthly")
  @ApiOkResponse({
    description: "List of monthly statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async getMonthlyStats(){
    return this.ordersService.getMonthlyStats()
  }

  // Get annual stats
  @Get("stats/annual")
  @ApiOkResponse({
    description: "List of annual statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async getAnnualStats(){
    return this.ordersService.getAnnualStats()
  }

  @Get("stats/top-dishes")
  @ApiOkResponse({
    description: "Ranking of the most ordered dishes"
  })
  @ApiQuery({name: "top", description: "Top of the dishes to show", required: false})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async rankingOrdersDishes(@Query("top") top?: number){
    return this.ordersService.rankingOrdersDishes(top)
  }
}
