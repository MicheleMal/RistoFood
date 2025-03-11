import { Category } from 'src/enums/categories.enum';
import { OrderDish } from 'src/orders/order-dish.entity';
import { Venue } from 'src/venues/venue.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne(()=>Venue, (venue)=>venue.dishes, {nullable: true, onDelete: "CASCADE"})
  @JoinColumn({name: "id_venue", referencedColumnName: "id"})
  venue: Venue

  @OneToMany(() => OrderDish, (orderDish) => orderDish.dish)
  order_dishes: OrderDish[];
}
