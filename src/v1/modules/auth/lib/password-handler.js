import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

export default class PasswordHandler {
  /**
   * Creates a hash based on a string
   * @param string
   * @returns {*}
   */
  static createHash(string) {
    const salt = bcrypt.genSaltSync(5);

    const shasum = crypto.createHash('sha256');
    const digest = shasum.update(string).digest('hex');

    return bcrypt.hashSync(digest, salt, null);
  }

  /**
   * Validates a hash based on a string
   * @param string
   * @param hash
   * @returns {*}
   */
  static validateHash(string, hash) {
    const shasum = crypto.createHash('sha256');
    const digest = shasum.update(string).digest('hex');

    return bcrypt.compareSync(digest, hash);
  }
}
