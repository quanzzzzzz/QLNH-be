import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TableEntity } from '../../tables/entities/table.entity';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customer_name: string;

  @Column()
  phone: string;

  @Column()
  reservation_time: Date;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => TableEntity)
  @JoinColumn({ name: 'table_id' })
  table: TableEntity;
}
