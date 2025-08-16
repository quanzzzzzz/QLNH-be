import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { CreateReservationDto } from '../dtos/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.createReservation(dto);
  }

  @Get()
  findAll() {
    return this.reservationService.getAll();
  }
}
