import 'reflect-metadata';
import { Container } from 'inversify';
import { TypesCompose } from '.';
import { UserController } from '@/controllers/userController';
import {
  ProductController,
  ProductControllerClient,
} from '@/controllers/productControlles';
import { MarkController } from '@/controllers/markController';
import { OrderController } from '@/controllers/orderController';
import { UserRepository } from '@/repositories/userRepository';
import {
  ProductRepository,
  ProductClientRepository,
} from '@/repositories/productRepository';
import { MarkRepository } from '@/repositories/markRepository';
import { OrderRepository } from '@/repositories/orderRepository';
import { CategoryRepository } from '@/repositories/categoryRepository';
import { CategoryController } from '@/controllers/categoryController';
import { TagRepository } from '@/repositories/tagRepository';
import { TagController } from '@/controllers/tagController';

const container = new Container();

container.bind<TagController>(TypesCompose.tagCtrl).to(TagController);
container.bind<UserController>(TypesCompose.userCtrl).to(UserController);
container
  .bind<ProductController>(TypesCompose.productCtrl)
  .to(ProductController);
container.bind<MarkController>(TypesCompose.markCtrl).to(MarkController);
container.bind<OrderController>(TypesCompose.orderCtrl).to(OrderController);
container
  .bind<CategoryController>(TypesCompose.categoryCtrl)
  .to(CategoryController);

container
  .bind<ProductControllerClient>(TypesCompose.productClientCtrl)
  .to(ProductControllerClient);

container.bind<UserRepository>(TypesCompose.userRepo).to(UserRepository);
container
  .bind<ProductRepository>(TypesCompose.productRepo)
  .to(ProductRepository);
container.bind<MarkRepository>(TypesCompose.markRepo).to(MarkRepository);
container.bind<OrderRepository>(TypesCompose.orderRepo).to(OrderRepository);
container
  .bind<CategoryRepository>(TypesCompose.categoryRepo)
  .to(CategoryRepository);

container.bind<TagRepository>(TypesCompose.tagRepo).to(TagRepository);
container
  .bind<ProductClientRepository>(TypesCompose.productClientRepo)
  .to(ProductClientRepository);

export const productCtrl = container.get<ProductController>(
  TypesCompose.productCtrl,
);

export const productClientCtrl = container.get<ProductControllerClient>(
  TypesCompose.productClientCtrl,
);

export const tagCtrl = container.get<TagController>(TypesCompose.tagCtrl);
export const userCtrl = container.get<UserController>(TypesCompose.userCtrl);
export const markCtrl = container.get<MarkController>(TypesCompose.markCtrl);
export const orderCtrl = container.get<OrderController>(TypesCompose.orderCtrl);
export const categoryCtrl = container.get<CategoryController>(
  TypesCompose.categoryCtrl,
);
