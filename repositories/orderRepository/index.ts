import { injectable } from 'inversify';
import prisma, {
  UserId,
  OrderId,
  ProductPrisma,
  OrderPrisma,
} from '@/app/lib/db/prisma';
import { Maybe } from '@/app/lib/definitions/general';
import { OrderItem } from '@prisma/client';

export type MaybeOrder = Maybe<OrderPrisma>;
export type MaybeFullOrder = Maybe<
  OrderPrisma & { orderItems: OrderItem[] | null }
>;

@injectable()
export class OrderRepository {
  async getSelectionOrderByUserId({ id }: UserId): Promise<MaybeFullOrder> {
    return await prisma.order.findFirst({
      where: { customerId: id, status: 'Selection' },
      include: { orderItems: true },
    });
  }

  async createOrderByUserId({ id }: UserId): Promise<MaybeOrder> {
    return await prisma.order.create({ data: { customerId: id } });
  }

  async ConfirmOrderByOrderId({ id }: OrderId): Promise<MaybeOrder> {
    return await prisma.order.update({
      where: { id: id },
      data: { status: 'Confirmed', updateAt: new Date() },
    });
  }

  async AddProduct({ id }: UserId, product: ProductPrisma) {
    const order = await prisma.order.findFirst({ where: { customerId: id } });
  }
}
