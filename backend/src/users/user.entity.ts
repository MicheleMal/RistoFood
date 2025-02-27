import { Role } from 'src/enums/roles.enum';
import { Order } from 'src/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true
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
    default: Role.STAFF
  })
  role: Role;

  @Column({
    type: "varchar",
    nullable: true
  }) 
  refresh_token: string | null

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
