export class CreateOrderDto {
  table_id: string;
  items: {
    menu_item_id: string;
    quantity: number;
  }[];
}
