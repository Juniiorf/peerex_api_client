import uuid from 'uuid';

export default class StorageDecorator {
  /**
   * Set file that will be sent
   * @param file
   */
  setFile(file) {
    this.file = file;
  }

  /**
   * Set file buffer that will be sent
   * @param fileBuffer
   */
  setFileBuffer(fileBuffer) {
    this.fileBuffer = fileBuffer;
  }

  /**
   * Set destination directory path
   * @param dir
   */
  setDestinationDir(dir) {
    this.destinationDir = dir;
  }

  /**
   * Set file handling options
   * @param options
   */
  setOptions(options) {
    this.options = options;
  }

  /**
   * Upload files
   * @returns {Promise|Promise.<*>}
   */
  async upload() { //eslint-disable-line
    return Promise.reject('Not implemented yet.');
  }

  /**
   * Return final path
   */
  getFinalFilePath() {
    let ext;

    // Get file extension
    if (this.file) {
      const tmpExt = ((this.file || {}).name || '').split('.');
      ext = tmpExt.pop() || 'jpg';
    } else if (this.fileBuffer) {
      ext = this.fileBuffer.type.split('/').pop();
    }

    // Generate a new file name
    const newFileName = `${uuid.v4()}.${ext}`;

    // Generate a full path
    const newFilePath = `${process.env.NODE_ENV}/${this.destinationDir}/${newFileName}`;

    return { fullPath: newFilePath, fileName: newFileName };
  }
}
