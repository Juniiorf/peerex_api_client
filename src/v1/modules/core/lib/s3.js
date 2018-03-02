import AWS from 'aws-sdk';
import { readFile, unlink } from 'fs';

import StorageDecorator from '../decorators/storage-decorator';

export default class S3Storage extends StorageDecorator {
  constructor() {
    super();

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
    });
  }

  /**
   * Set bucket to be used
   * @param bucket
   */
  setBucket(bucket) {
    this.bucket = bucket;
  }

  getFileData() {
    return new Promise((resolve, reject) => {
      if (this.fileBuffer) {
        resolve(this.fileBuffer.data);
      } else {
        readFile(this.file.path, (err, fileData) => {
          if (err) {
            reject(err);
          } else {
            resolve(fileData);
          }
        });
      }
    });
  }

  getFileType() {
    if (this.file) return this.file.type;
    if (this.fileBuffer) return this.fileBuffer.type;
    return null;
  }

  /**
   * Send file to provided s3 bucket
   */
  async upload() {
    AWS.config.update({ region: process.env.AWS_REGION });
    return new Promise(async (resolve, reject) => {
      if (!this.destinationDir) {
        reject('No bucket provided');
        return;
      }

      if (!this.file && !this.fileBuffer) {
        reject('No file provided.');
        return;
      }

      try {
        const fileData = await this.getFileData();
        const s3bucket = new AWS.S3({
          params: { Bucket: this.bucket },
        });

        const fileInfo = this.getFinalFilePath();

        // Create s3 bucket
        s3bucket.createBucket(() => {
          const s3Params = {
            Key: fileInfo.fullPath,
            ContentType: this.getFileType(),
            Body: fileData,
            ACL: 'public-read',
          };

          // Upload file
          s3bucket.upload(s3Params, (uploadErr, uploadData) => {
            // Remove temp file
            if (this.file) {
              unlink(this.file.path);
            }

            if (uploadErr) {
              return reject(uploadErr);
            }

            return resolve({ ...uploadData, file: fileInfo.fileName });
          });
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
