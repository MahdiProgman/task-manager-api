import { Injectable } from '@nestjs/common';
import { HashingService } from '../interfaces/hashing.service.interface';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2HashingService implements HashingService {
  public async hash(plainText: string): Promise<string> {
    const hashedText = await argon2.hash(plainText);

    return hashedText;
  }

  public async compare(plainText: string, hash: string): Promise<boolean> {
    const isMatch = await argon2.verify(hash, plainText);

    return isMatch;
  }
}
