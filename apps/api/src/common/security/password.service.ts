import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);

  private readonly options: argon2.Options = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 2,
    hashLength: 32,
  };

  async hash(password: string): Promise<string> {
    try {
      return await argon2.hash(password, this.options);
    } catch (error) {
      this.logger.error('Failed to hash password.', error);
      throw new InternalServerErrorException(
        'Unable to securely process password.',
      );
    }
  }

  /**
   * Verify a password against a stored hash.
   * @param plainText  The raw password/token to verify.
   * @param hash       The stored hash (e.g., passwordHash, tokenHash).
   */
  async compare(plainText: string, hash: string): Promise<boolean> {
    if (!plainText || !hash) {
      return false;
    }
    try {
      return await argon2.verify(hash, plainText);
    } catch (error) {
      this.logger.error('Password comparison failed.', error);
      throw new InternalServerErrorException('Unable to verify password.');
    }
  }

  // Optional: keep verify as an alias if you like
  async verify(hash: string, plainText: string): Promise<boolean> {
    return this.compare(plainText, hash);
  }
}
