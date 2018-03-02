import { result } from 'lodash';

/**
 * This class handles all settings stored in database
 */
export class SettingsController {
  constructor(Settings) {
    this.Settings = Settings;
  }

  /**
   * Returns selected settings from given path. The path can either be a string or an array, and it's able to provide
   * a filter function to the query
   * @param path
   * @param _filter
   * @returns {null}
   */
  getSettings(path, _filter = {}) {
    // Check if provided path is an array
    const __path = !Array.isArray(path) ? [path] : path;
    if (!__path.length) return null;

    // Get path _id
    const _id = __path.shift();
    const filter = { _id, ..._filter };

    // Prepare projection
    const projection = {};
    if (__path.length) {
      projection[__path.join('.')] = 1;
    }

    // Return parsed data
    return this.Settings.findOne(filter, projection).then(res => result(res, path.join('.')));
  }
}

export default Settings =>
  new SettingsController(Settings);
