import { inject, injectable } from 'inversify';
import { TypesCompose } from '@/app/lib/compose';
import { type OrderRepository } from '@/repositories/orderRepository';
import { type ProductRepository } from '@/repositories/productRepository';

@injectable()
export class OrderController {
  constructor(
    @inject(TypesCompose.orderRepo)
    private readonly orderRepository: OrderRepository,
    @inject(TypesCompose.productRepo)
    private readonly getterManyProducts: ProductRepository,
  ) {}

  async addItem({
    userId,
    productId,
    quantity,
  }: {
    userId: number;
    productId: number;
    quantity: number;
  }) {
    let order = await this.orderRepository.getSelectionFullOrderByUserId({
      id: userId,
    });

    if (!order) {
      order = await this.orderRepository.createOrderByUserId({ id: userId });
    }
    await this.orderRepository.addProduct({
      orderId: order.id,
      productId,
      quantity,
    });
  }
  /*
	async getSelectionOrderByUserId({ id }: { id: number }) {
		const order = await this.orderRepository.getSelectionOrderByUserId({ id });

		if (!order) {
			return this.orderRepository.createOrderByUserId({ id });
		}

		if (!Array.isArray(order.orderItems)) {
			return order;
		}

		if (order.orderItems.length === 0) {
			return order;
		}

		const products = await this.getterManyProducts.getManyById(
			order.orderItems,
		);

		console.log({
			orderId: order.id,
			products: products?.map((p) => ({
				id: p.id,
				name: p.name,
				a: p.quantity,
			})),
		});
		return {};
	}
	*/
}
