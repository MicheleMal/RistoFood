import { Order } from 'src/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

enum Role {
  ADMIN = 'admin',
  STAFF = 'staff',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
