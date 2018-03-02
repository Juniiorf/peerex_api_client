import { Router } from 'express';
import { existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Register all routes from provided path
 * @param app
 * @param version
 * @param routePath
 */
function registerRoutesFromRequireDir(app, version, routePath) {
  // Get all directories from given path
  const dirs = readdirSync(routePath).filter(f => statSync(`${routePath}/${f}`).isDirectory());

  // For each dir, load routes if available
  dirs.forEach((dir) => {
    const path = join(routePath, dir, '/routes');
    const endpoint = `${version}/${dir}`;
    if (existsSync(path)) {
      const router = Router();

      // Require loaded path and inject router
      require(path)(router); //eslint-disable-line

      // Add router to the loaded path, from current version
      app.use(endpoint, router);
    }
  });
}

// Initialize all routes
export default (app) => {
  registerRoutesFromRequireDir(app, '/v1', join(__dirname, '/../../src/v1/modules'));
};
