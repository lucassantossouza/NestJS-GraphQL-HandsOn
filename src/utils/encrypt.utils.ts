// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as bcrypt from 'bcrypt';

export class EncryptUtils {
  async encrypt(plainText: string = ''): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(plainText, salt);
      return { salt, password: hashPassword };
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
      const hashPassword = await bcrypt.hash(password, salt);
      return hashPassword === cipherText;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
