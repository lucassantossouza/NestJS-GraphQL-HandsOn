// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as bcrypt from 'bcrypt';

export class EncryptUtils {
  async encrypt(plainText: string = ''): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(plainText, salt);
      return { salt, hash };
    } catch (error) {
      return {};
    }
  }

  async compare(
    password: string,
    cipherText: string,
    salt: string,
  ): Promise<boolean> {
    try {
      const hash = await bcrypt.hash(password, salt);
      return hash === cipherText;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
