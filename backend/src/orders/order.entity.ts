import { OrderDish } from 'src/order-dish/order-dish.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
    type: 'decimal',
    default: 0,
    precision: 10,
    scale: 2
  })
  price_total: number;

  @Column({
    type: 'enum',
    enum: State,
    default: State.WAIT
  })
  state: State;

  @ManyToOne(() => User, (user) => user.orders, {nullable: false})
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(()=>OrderDish, (orderDish)=>orderDish.order)
  order_dishes: OrderDish[]
}
