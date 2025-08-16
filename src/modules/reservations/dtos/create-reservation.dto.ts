export class CreateReservationDto {
  customer_name: string;
  phone: string;
  reservation_time: Date;
  note?: string;
  table_id: string;
}
