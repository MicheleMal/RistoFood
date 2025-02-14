import { Category } from 'src/enums/categories.enum';
import { OrderDish } from 'src/orders/order-dish.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'dishes' })
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @OneToMany(() => OrderDish, (orderDish) => orderDish.dish)
  order_dishes: OrderDish[];
}
