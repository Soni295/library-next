import bcrypt from 'bcrypt';
import { CONFIG } from './config';

export class HandlerPassword {
  static async generateHash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(CONFIG.SALT_OF_PASSOWORD);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw new Error(`Error encrypting the password: ${err}`);
    }
  }

  static async checkPassword(
    password: string,
    hashed: string,
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hashed);
      return match;
    } catch (err) {
      throw new Error(`Error verifying the password: ${err}`);
    }
  }
}
