import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private async generateSalt(): Promise<string> {
    return bcrypt.genSalt(10);
  }

  async hash(value: string): Promise<string> {
    const salt = await this.generateSalt();
    return bcrypt.hash(value, salt);
  }

  async isMatch(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
