import { inject, injectable } from 'inversify';
import { TypesCompose } from '@/app/lib/compose';
import { LoginInput, UserCreateInput } from '@/app/lib/definitions/user';

import {
  ERR_DOESNT_EXIST_USER,
  ERR_SERVER_INTERNAL,
  ERR_USER_EXIST,
  ERR_WRONG_PASSWORD,
} from '@/app/lib/errors/serverErr';
import { HandlerPassword } from '@/app/lib/utils/handlePassword';
import { type UserRepository } from '@/repositories/userRepository';
import { GeneralController } from './mainController';

@injectable()
export class UserController extends GeneralController {
  constructor(
    @inject(TypesCompose.userRepo)
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async isAdmin() {
    return this.userPermissionVerifier.isAdmin();
  }

  async signIn(data: UserCreateInput) {
    const userDb = await this.userRepository.getUserByEmail(data.email);

    if (userDb) return ERR_USER_EXIST;
    const hash = await HandlerPassword.generateHash(data.password);

    const newUser = await this.userRepository.save({
      name: data.name,
      email: data.email,
      password: hash,
    });

    if (!newUser) return newUser;

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }

  async login({ email, password }: LoginInput) {
    const userDb = await this.userRepository.getUserByEmail(email);
    if (!userDb) return ERR_DOESNT_EXIST_USER;

    if (!(await HandlerPassword.checkPassword(password, userDb.password))) {
      return ERR_WRONG_PASSWORD;
    }

    return {
      id: userDb.id,
      name: userDb.name,
      email: userDb.email,
      role: userDb.role,
    };
  }

  async getUserInformationById({ id }: { id: number }) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw ERR_SERVER_INTERNAL;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  static async disableUser({ _id }: { _id: number }) {
    /* todo */
  }
}
