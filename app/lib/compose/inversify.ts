import 'reflect-metadata';
import { Container } from 'inversify';
import { TypesCompose } from '.';
import { UserController } from '@/controllers/userController';
import { ProductController } from '@/controllers/productControlles';
import { MarkController } from '@/controllers/markController';
import { OrderController } from '@/controllers/orderController';
import { UserRepository } from '@/repositories/userRepository';
import { ProductRepository } from '@/repositories/productRepository';
import { MarkRepository } from '@/repositories/markRepository';
import { OrderRepository } from '@/repositories/orderRepository';

const container = new Container();

container.bind<UserController>(TypesCompose.userCtrl).to(UserController);
container
  .bind<ProductController>(TypesCompose.productCtrl)
  .to(ProductController);
container.bind<MarkController>(TypesCompose.markCtrl).to(MarkController);
container.bind<OrderController>(TypesCompose.orderCtrl).to(OrderController);

container.bind<UserRepository>(TypesCompose.userRepo).to(UserRepository);
container
  .bind<ProductRepository>(TypesCompose.productRepo)
  .to(ProductRepository);
container.bind<MarkRepository>(TypesCompose.markRepo).to(MarkRepository);
container.bind<OrderRepository>(TypesCompose.orderRepo).to(OrderRepository);

export const productCtrl = container.get<ProductController>(
  TypesCompose.productCtrl,
);
export const userCtrl = container.get<UserController>(TypesCompose.userCtrl);
export const markCtrl = container.get<MarkController>(TypesCompose.markCtrl);
export const orderCtrl = container.get<OrderController>(TypesCompose.orderCtrl);
