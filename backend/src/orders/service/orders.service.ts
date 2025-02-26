import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../order.entity';
import { Not, Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderDish } from '../order-dish.entity';
import { User } from 'src/users/user.entity';
import { Dish } from 'src/dishes/dish.entity';
import { ResponseOrderDto } from '../dtos/response-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { State } from 'src/enums/states.enum';
import { responseDeleteDto } from 'src/dto/response-delete.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    @InjectRepository(OrderDish)
    private orderDishRepository: Repository<OrderDish>,
  ) {}

  async insertNewOrder(
    createOrderDto: CreateOrderDto,
    req: Request,
  ): Promise<ResponseOrderDto> {
    const { user_id } = req['user'];

    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    // createOrderDto.date = new Date()
    const newOrder = await this.orderRepository.save({
      ...createOrderDto,
      user: user,
    });

    let priceTotal = 0;
    let orderDishes: OrderDish[] = [];
    for (const dishDto of createOrderDto.dishes) {
      const dish = await this.dishRepository.findOne({
        where: {
          id: dishDto.id_dish,
        },
      });

      const orderDishCreate = this.orderDishRepository.create({
        single_price: dish.price,
        quantity: dishDto.quantity,
        order: newOrder,
        dish: dish,
      });

      priceTotal +=
        dishDto.quantity * dish.price +
        createOrderDto.cover_charge * createOrderDto.n_person;
      orderDishes.push(await this.orderDishRepository.save(orderDishCreate));
    }

    newOrder.price_total = priceTotal;

    const id_order = (await this.orderRepository.save(newOrder)).id;

    return {
      id_order: id_order,
      n_person: createOrderDto.n_person,
      n_table: createOrderDto.n_table,
      state: newOrder.state,
      notes: newOrder.notes,
      date: newOrder.date,
      dishes: orderDishes.map((orderDish) => ({
        id_dish: orderDish.id,
        name: orderDish.dish.name,
        description: orderDish.dish.description,
        single_price: orderDish.dish.price,
        quantity: orderDish.quantity,
      })),
      cover_charge: createOrderDto.cover_charge,
      price_total: newOrder.price_total,
    };
  }

  async getAllOrder(
    state?: State,
    page?: number,
    limit?: number,
  ): Promise<ResponseOrderDto[]> {
    const query = this.orderRepository
      .createQueryBuilder('o')
      .innerJoinAndSelect('o.user', 'u')
      .innerJoinAndSelect('o.order_dishes', 'od')
      .innerJoinAndSelect('od.dish', 'd');

    if (state) {
      query.where('o.state = :state', { state });
    }

    if (page && limit) {
      query.limit(limit).offset((page - 1) * limit);
    }

    const orders = await query.getMany();

    return orders.map((order) => ({
      id_order: order.id,
      n_person: order.n_person,
      n_table: order.n_table,
      state: order.state,
      notes: order.notes,
      date: order.date,
      dishes: order.order_dishes.map((orderDish) => ({
        id_dish: orderDish.dish.id,
        name: orderDish.dish.name,
        description: orderDish.dish.description,
        single_price: orderDish.dish.price,
        quantity: orderDish.quantity,
      })),
      cover_charge: order.cover_charge,
      price_total: order.price_total,
      user: {
        username: order.user.username,
        role: order.user.role,
      },
    }));
  }

  async getOrderByTableNumber(n_table: number): Promise<ResponseOrderDto[]> {
    const orders = await this.orderRepository.find({
      where: {
        n_table: n_table,
        state: State.PREPARATION,
      },
      relations: ['user', 'order_dishes', 'order_dishes.dish'],
    });

    if (orders.length === 0) {
      throw new NotFoundException('No orders found for this table');
    }

    return orders.map((order) => ({
      id_order: order.id,
      n_person: order.n_person,
      n_table: order.n_table,
      state: order.state,
      notes: order.notes,
      date: order.date,
      dishes: order.order_dishes.map((orderDish) => ({
        id_dish: orderDish.dish.id,
        name: orderDish.dish.name,
        description: orderDish.dish.description,
        single_price: orderDish.dish.price,
        quantity: orderDish.quantity,
      })),
      cover_charge: order.cover_charge,
      price_total: order.price_total,
      user: {
        username: order.user.username,
        role: order.user.role,
      },
    }));
  }

  async updateOrder(
    updateOrderDto: UpdateOrderDto,
    id: number,
  ): Promise<ResponseOrderDto> {
    const updateOrder = await this.orderRepository.update(id, updateOrderDto);

    if (updateOrder.affected === 0) {
      throw new NotFoundException('No order found');
    }

    const order = await this.orderRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user', 'order_dishes', 'order_dishes.dish'],
    });

    return {
      id_order: order.id,
      n_person: order.n_person,
      n_table: order.n_table,
      state: order.state,
      notes: order.notes,
      date: order.date,
      dishes: order.order_dishes.map((orderDish) => ({
        id_dish: orderDish.dish.id,
        name: orderDish.dish.name,
        description: orderDish.dish.description,
        single_price: orderDish.dish.price,
        quantity: orderDish.quantity,
      })),
      cover_charge: order.cover_charge,
      price_total: order.price_total,
      user: {
        username: order.user.username,
        role: order.user.role,
      },
    };
  }

  async updateOrderDish(
    id_order: number,
    id_dish: number,
    quantity: number,
  ): Promise<ResponseOrderDto> {
    const updateOrderDish = await this.orderDishRepository
      .createQueryBuilder()
      .update(OrderDish)
      .set({ quantity })
      .where('order_dish.id_order = :id_order', { id_order })
      .andWhere('order_dish.id_dish = :id_dish', { id_dish })
      .execute();

    const order = await this.orderRepository.findOne({
      where: {
        id: id_order,
      },
      relations: ['user', 'order_dishes', 'order_dishes.dish'],
    });

    let new_price_total: number = 0;

    order.order_dishes.map((orderDish) => {
      new_price_total +=
        parseFloat(orderDish.single_price.toString()) * orderDish.quantity;
    });

    await this.orderRepository.update(
      {
        id: id_order,
      },
      {
        price_total: new_price_total,
      },
    );

    if (updateOrderDish.affected === 0) {
      throw new NotFoundException('No dish or order found');
    }

    return {
      id_order: id_order,
      n_person: order.n_person,
      n_table: order.n_table,
      state: order.state,
      notes: order.notes,
      date: order.date,
      dishes: order.order_dishes.map((orderDish) => ({
        id_dish: id_dish,
        name: orderDish.dish.name,
        description: orderDish.dish.description,
        single_price: orderDish.dish.price,
        quantity: quantity,
      })),
      price_total: new_price_total,
      cover_charge: order.cover_charge,
      user: {
        username: order.user.username,
        role: order.user.role,
      },
    };
  }

  async deleteOrder(id: number): Promise<responseDeleteDto> {
    const deleteOrder = await this.orderRepository.delete(id);

    if (deleteOrder.affected === 0) {
      throw new NotFoundException('No order found');
    }

    return {
      message: 'Dish deleted successfully',
      error: null,
      statusCode: 200,
    };
  }

  async getDailyStats() {
    const currentDay = new Date().getDate();

    const query = this.orderRepository
      .createQueryBuilder('o')
      .select('COUNT(o.id)', 'total_orders')
      .addSelect('SUM(o.price_total)', 'earnings')
      .where(`DAY(o.date) = :currentDay`, { currentDay });

    const orders = await query.getRawMany();

    return orders;
  }

  async getMonthlyStats() {
    const query = this.orderRepository
      .createQueryBuilder('o')
      .select('MONTH(o.date)', 'month')
      .addSelect('COUNT(o.id)', 'total_orders')
      .addSelect('SUM(o.price_total)', 'earnings')
      .groupBy('MONTH(o.date)');

    const orders = await query.getRawMany();

    return orders;
  }

  async getAnnualStats() {
    const query = this.orderRepository
      .createQueryBuilder('o')
      .select('YEAR(o.date)', 'year')
      .addSelect('COUNT(o.id)', 'total_orders')
      .addSelect('SUM(o.price_total)', 'earnings')
      .groupBy('YEAR(o.date)');

    const orders = await query.getRawMany();

    return orders;
  }

  async rankingOrdersDishes(top?: number){

    const query = this.orderDishRepository
      .createQueryBuilder("od")
      .addSelect("SUM(od.quantity)", "n_order_dish")
      .innerJoinAndSelect("od.dish", "d")
      .groupBy("od.dish")
      .orderBy("n_order_dish", "DESC")
    
    if(top){
      query.limit(top)
    }

    const orders = await query.getRawMany()

    return orders
  }
}
