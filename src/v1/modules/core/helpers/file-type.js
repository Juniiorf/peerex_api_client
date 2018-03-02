module.exports = class FileTypeHelper {
  /**
   * Populate file type from input data
   * @param data
   * @returns {{file, url, fileType: (*|string), size}}
   */
  static populateFileType(data) {
    return {
      uploadedFile: data.name,
      file: data.file,
      url: data.Location,
      fileType: data.type,
      size: data.size,
    };
  }
};

