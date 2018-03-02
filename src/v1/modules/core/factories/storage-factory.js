import storageTypes from '../enums/storage';

import S3Storage from '../lib/s3';

export default class StorageFactory {
  /**
   * Returns requested storage
   * @param storageType
   * @returns {*}
   */
  static getStorage(storageType) {
    switch (storageType) {
      case storageTypes.S3:
        return new S3Storage();

      default:
        return null;
    }
  }
}
