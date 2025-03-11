import { Role } from 'src/enums/roles.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Venue } from './venue.entity';
import { User } from 'src/users/user.entity';

@Entity({ name: 'venue_user' })
export class VenueUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STAFF,
  })
  role: Role;

  @ManyToOne(() => Venue, (venue) => venue.venue_users, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'id_venue' })
  venue: Venue;

  @ManyToOne(() => User, (user) => user.venue_users, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'id_user' })
  user: User;
}
