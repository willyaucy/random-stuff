import * as crypto from 'crypto';
import { Random } from './random';

export class SecureRandom implements Random {
  nextInt(bound: number = 0xffff) {
    if (!Number.isInteger(bound) || bound < 0 || bound > 0xffff) {
      throw new Error('Must be a 32 bit nonnegative integer');
    }

    const bitmask = this.calcBitmaskFromBound(bound);

    while (true) {
      const output = bitmask & crypto.randomBytes(4).readUInt32BE();

      if (output < bound) {
        return output;
      }
    }
  }

  calcBitmaskFromBound(bound: number): number {
    let bitmask = 0;

    while (bound > 0) {
      bound >>= 1;
      bitmask = (bitmask << 1) | 1;
    }

    return bitmask;
  }
}
