import * as fs from 'fs/promises';
import * as path from 'path';

import pathStore from './createPathStore.js';
import errorCathingDecor from './errorCathingDecor.js';
import validateToStorePath from './validateToStorePath.js';

const generatePaths = async (dirPath, relativeDir) => {
  const subDirs = await fs.readdir(dirPath);

  const paths = await Promise.all(
    subDirs.map(async (subDir) => {
      const subDirPath = path.resolve(dirPath, subDir);

      const subDirInfo = await fs.lstat(subDirPath);

      const paramsForValidation = [subDirPath, subDirInfo, relativeDir];

      const isSubDirDirectory = subDirInfo.isDirectory();

      const isValidToStorePath = validateToStorePath(...paramsForValidation);

      if (isValidToStorePath) {
        pathStore.storePath(subDirPath);
      }

      if (!isSubDirDirectory) {
        return subDir === 'index.ts' ? [] : subDirPath;
      }

      return await generatePaths(subDirPath, relativeDir);
    })
  );

  return paths.flat();
};

export default errorCathingDecor(generatePaths);