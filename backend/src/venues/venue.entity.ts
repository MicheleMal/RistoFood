import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VenueUser } from './venue-user.entity';
import { User } from 'src/users/user.entity';
import { Order } from 'src/orders/order.entity';
import { Dish } from 'src/dishes/dish.entity';

@Entity({ name: 'venues' })
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  city: string;

  @Column({
    type: 'varchar',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true
  })
  phone_number: string;

  @OneToMany(()=>Order, (order)=>order.venue)
  orders: Order[]

  @OneToMany(()=>Dish, (Dish)=>Dish.venue)
  dishes: Dish[]
  
  @OneToMany(() => VenueUser, (venueUser) => venueUser.venue)
  venue_users: VenueUser[];
}
