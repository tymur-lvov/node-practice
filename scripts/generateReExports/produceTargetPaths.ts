import * as fs from 'fs/promises';
import * as path from 'path';

import { tryCatchDecorator } from '@scripts';

const produceTargetPaths = async (targetDirsArray: string[]): Promise<string[]> => {
  const targetDirs = new Set(targetDirsArray);

  const ignoredEntities = new Set(['.git', 'node_modules']);

  const rootPath = path.resolve();

  const findTargetPaths = async (currentPath: string = rootPath): Promise<string[]> => {
    const entities = await fs.readdir(currentPath);

    const targetPaths = await Promise.all(
      entities.map(async (entity) => {
        const entityPath = path.resolve(currentPath, entity);

        const entityData = await fs.lstat(entityPath);

        if (ignoredEntities.has(entity)) {
          return;
        }

        if (targetDirs.has(entity)) {
          return entityPath;
        }

        if (entityData.isDirectory()) {
          return await findTargetPaths(entityPath);
        }
      })
    );

    return targetPaths.flat().filter(Boolean) as string[];
  };

  return await findTargetPaths();
};

export default tryCatchDecorator(produceTargetPaths);
