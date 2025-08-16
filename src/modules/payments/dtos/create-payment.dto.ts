export class CreatePaymentDto {
  order_id: string;
  method: 'cash' | 'card' | 'e-wallet';
}
