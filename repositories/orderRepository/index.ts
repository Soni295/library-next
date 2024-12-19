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
  async getSelectionOrderByUserId({ id }: UserId) {
    return await prisma.order.findFirst({
      where: { customerId: id, status: 'Selection' },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                photo: true,
                basePrice: true,
              },
            },
          },
        },
      },
    });
  }

  async getSelectionFullOrderByUserId({ id }: UserId) {
    return await prisma.order.findFirst({
      where: { customerId: id, status: 'Selection' },
      include: { orderItems: true },
    });
  }

  async createOrderByUserId({ id }: UserId) {
    return await prisma.order.create({
      data: { customerId: id },
      include: { orderItems: true },
    });
  }

  async ConfirmOrderByOrderId({ id }: OrderId): Promise<MaybeOrder> {
    return await prisma.order.update({
      where: { id: id },
      data: { status: 'Confirmed', updateAt: new Date() },
    });
  }

  async removeItem({
    orderId,
    productId,
  }: {
    orderId: number;
    productId: number;
  }) {
    const d = await prisma.orderItem.deleteMany({
      where: { orderId, productId },
    });
    return d;
  }

  async addItem({
    orderId,
    productId,
    quantity,
  }: {
    orderId: number;
    productId: number;
    quantity: number;
  }) {
    const where = { id: orderId };

    const order = await prisma.order.findFirst({
      where,
      include: { orderItems: true },
    });

    const updatedAt = new Date();
    const item = order?.orderItems.find((item) => item.productId == productId);
    if (!item) {
      return await prisma.order.update({
        where: { id: orderId },
        data: {
          orderItems: { create: [{ productId, quantity: quantity }] },
          updateAt: updatedAt,
        },
      });
    }
    item.quantity += quantity;

    return prisma.order.update({
      where,
      include: { orderItems: true },
      data: {
        updateAt: updatedAt,
        orderItems: {
          update: {
            where: { id: item.id },
            data: { quantity: item.quantity, updatedAt: updatedAt },
          },
        },
      },
    });
  }
}
