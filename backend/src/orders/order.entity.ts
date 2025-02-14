import { State } from 'src/enums/states.enum';
import { OrderDish } from 'src/orders/order-dish.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    scale: 2,
  })
  price_total: number;

  @Column({
    type: 'enum',
    enum: State,
    default: State.WAIT,
  })
  state: State;

  @Column({
    type: "varchar",
    default: ""
  })
  notes: string

  @Column({
    type: "timestamp",
    default: ()=>"CURRENT_TIMESTAMP"
  })
  date: Date

  @ManyToOne(() => User, (user) => user.orders, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => OrderDish, (orderDish) => orderDish.order)
  order_dishes: OrderDish[];
}
