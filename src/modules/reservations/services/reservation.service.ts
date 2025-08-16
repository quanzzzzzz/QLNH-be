import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from '../entities/reservation.entity';
import { TableEntity } from '../../tables/entities/table.entity';
import { CreateReservationDto } from '../dtos/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepo: Repository<ReservationEntity>,
    @InjectRepository(TableEntity)
    private readonly tableRepo: Repository<TableEntity>,
  ) {}

  async createReservation(dto: CreateReservationDto) {
    const table = await this.tableRepo.findOne({ where: { id: dto.table_id } });
    if (!table) throw new Error('Table not found');
    if (table.status !== 'available') throw new Error('Table is not available');

    table.status = 'reserved';
    await this.tableRepo.save(table);

    const reservation = this.reservationRepo.create({ ...dto, table });
    return await this.reservationRepo.save(reservation);
  }

  async getAll() {
    return this.reservationRepo.find({ relations: ['table'] });
  }
}
