import { getNestedFilePathsRecurs } from '@helpers';

import type { IProcessFileData, IProcessFilePath } from '@types';

export const processFilePath: IProcessFilePath = (dirPath) => {
  if (dirPath.includes('@types')) {
    return `${dirPath}/index.types.ts`;
  }

  return `${dirPath}/index.ts`;
};

export const processFileData: IProcessFileData = async (dirPath) => {
  const filePaths = await getNestedFilePathsRecurs(dirPath);
  console.log(filePaths);

  return '';
};
