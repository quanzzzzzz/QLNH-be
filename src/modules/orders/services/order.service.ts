import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { TableEntity } from '../../tables/entities/table.entity';
import { MenuItemEntity } from 'src/modules/menu/entities/menu-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepo: Repository<OrderItemEntity>,
    @InjectRepository(TableEntity)
    private readonly tableRepo: Repository<TableEntity>,
    @InjectRepository(MenuItemEntity)
    private readonly menuItemRepo: Repository<MenuItemEntity>,
  ) {}

  async create(dto: CreateOrderDto) {
    const table = await this.tableRepo.findOneBy({ id: dto.table_id });

    const order = this.orderRepo.create({ table, status: 'pending' });

    // ✅ Tạo từng item có giá
    const orderItems: OrderItemEntity[] = [];

    for (const item of dto.items) {
      const menuItem = await this.menuItemRepo.findOneByOrFail({
        id: item.menu_item_id,
      });

      orderItems.push(
        this.orderItemRepo.create({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          price: Number(menuItem.price), // ✅ Lấy giá từ thực đơn
        }),
      );
    }

    order.items = orderItems;

    return this.orderRepo.save(order);
  }

  async findAll() {
    return this.orderRepo.find({ relations: ['table', 'items'] });
  }

  async updateStatus(id: string, status: OrderEntity['status']) {
    await this.orderRepo.update(id, { status });
    return this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'table'],
    });
  }
}
