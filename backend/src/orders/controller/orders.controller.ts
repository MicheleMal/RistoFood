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
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ResponseDeleteDto } from 'src/dto/response-delete.dto';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Insert new order
  @Post('/venue/:id_venue/insert')
  @ApiCreatedResponse({
    description: "New order created"
  })
  @ApiProperty({
    name: "id_venue",
    description: "Id venue",
    type: Number
  })
  @ApiBody({
    type: CreateOrderDto
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async insertNewDish(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @Request() req: Request,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.insertNewOrder(id_venue, createOrderDto, req);
  }

  // Get all order
  @Get('/venue/:id_venue/all')
  @ApiOkResponse({
    type: [ResponseOrderDto],
    description: "List of all orders"
  })
  @ApiParam({
    name: "id_venue",
    description: "Id venue",
    type: Number
  })
  @ApiQuery({name: "s", description: "State order", required: false, enum: State})
  @ApiQuery({name: "page", description: "Page number for pagination", required: false })
  @ApiQuery({name: "limit", description: "", required: false})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async getAllOrder(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Query('s') state?: State,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ResponseOrderDto[]> {
    return this.ordersService.getAllOrder(id_venue, state, page, limit);
  }

  // Get orders by table number
  @Get('/venue/:id_venue/table/:n_table')
  @ApiParam({
    name: "id_venue",
    type: Number,
    description: "Id venue"
  })
  @ApiParam({
    name: "n_table",
    type: Number,
    description: "Table number"
  })
  @ApiOkResponse({
    type: [ResponseOrderDto],
    description: "List of all orders for a specific table"
  })
  @ApiNotFoundResponse({
    description: "No orders found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async getOrderByTableNumber(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Param('n_table', ParseIntPipe) n_table: number,
  ): Promise<ResponseOrderDto[]> {
    return this.ordersService.getOrderByTableNumber(id_venue, n_table);
  }

  // Update order (n_person, n_table, state)
  @Patch('/venue/:id_venue/update/:id_order')
  @ApiParam({
    name: "id_venue",
    type: Number,
    description: "Id venue"
  })
  @ApiParam({
    name: "id_order",
    type: Number,
    description: "Id order"
  })
  @ApiBody({
    type: UpdateOrderDto
  })
  @ApiOkResponse({
    type: ResponseOrderDto,
    description: "Order successfully modified"
  })
  @ApiNotFoundResponse({
    description: "No order found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async updateOrder(
    @Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Param('id_order', ParseIntPipe) id_order: number,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.updateOrder(updateOrderDto, id_venue, id_order);
  }

  // Update order dish
  @Put('update/:id_order/dish/:id_dish')
  @ApiProperty({
    name: "id_order",
    description: "Id order",
    type: Number
  })
  @ApiProperty({
    name: "id_dish",
    description: "Id dish",
    type: Number
  })
  @ApiOkResponse({
    type: ResponseOrderDto,
    description: "Order successfully modified"
  })
  @ApiNotFoundResponse({
    description: "No dish or order found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async updateOrderDish(
    @Param('id_order', ParseIntPipe) id_order: number,
    @Param('id_dish', ParseIntPipe) id_dish: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<ResponseOrderDto> {
    return this.ordersService.updateOrderDish(id_order, id_dish, quantity);
  }

  // Delete order
  @Delete('/venue/id_venue/delete/:id_order')
  @ApiParam({
    name: "id_venue",
    type: Number,
    description: "Id venue"
  })
  @ApiParam({
    name: "id_order",
    type: Number,
    description: "Id order"
  })
  @ApiOkResponse({
    type: ResponseDeleteDto,
    description: "Dish deleted successfully"
  })
  @ApiNotFoundResponse({
    description: "No order found"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.OWNER)
  async deleteOrder(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Param('id_order', ParseIntPipe) id_order: number,
  ): Promise<ResponseDeleteDto> {
    return this.ordersService.deleteOrder(id_venue, id_order);
  }

  // Get daily stats
  @Get("/venue/:id_venue/stats/daily")
  @ApiParam({
    name: "id_venue",
    description: "Id venue",
    type: Number
  })
  @ApiOkResponse({
    description: "List of daily statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async getDailyStats(
    @Param('id_venue', ParseIntPipe) id_venue: number
  ){
    return this.ordersService.getDailyStats(id_venue)
  }

  // Get monthly stats
  @Get("/venue/:id_venue/stats/monthly")
  @ApiParam({
    name: "id_venue",
    description: "Id venue",
    type: Number
  })
  @ApiOkResponse({
    description: "List of monthly statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async getMonthlyStats(
    @Param('id_venue', ParseIntPipe) id_venue: number
  ){
    return this.ordersService.getMonthlyStats(id_venue)
  }

  // Get annual stats
  @Get("/venue/:id_venue/stats/annual")
  @ApiParam({
    name: "id_venue",
    description: "Id venue",
    type: Number
  })
  @ApiOkResponse({
    description: "List of annual statistics"
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async getAnnualStats(
    @Param('id_venue', ParseIntPipe) id_venue: number
  ){
    return this.ordersService.getAnnualStats(id_venue)
  }

  @Get("/venue/:id_venue/stats/top-dishes")
  @ApiParam({
    name: "id_venue",
    description: "Id venue",
    type: Number
  })
  @ApiOkResponse({
    description: "Ranking of the most ordered dishes"
  })
  @ApiQuery({name: "top", description: "Top of the dishes to show", required: false})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  async rankingOrdersDishes(
    @Param('id_venue', ParseIntPipe) id_venue: number,
    @Query("top") top?: number,   
  ){
    return this.ordersService.rankingOrdersDishes(id_venue, top)
  }
}
