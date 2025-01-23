import { OrderDish } from 'src/order-dish/order-dish.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum State {
  WAIT = 'wait',
  PREPARATION = 'preparation',
  COMPLETED = 'completed',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    default: 1,
  })
  n_person: number;

  @Column({
    type: 'int',
  })
  n_table: number;

  @Column({
    type: 'double',
    default: 0,
  })
  price_total: number;

  @Column({
    type: 'enum',
    enum: State,
  })
  state: State;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(()=>OrderDish, (orderDish)=>orderDish.order)
  order_dishes: OrderDish[]
}
