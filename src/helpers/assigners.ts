import { processIndexFileData } from '../processors';
import { getDirEnts } from './files';
import { filterFilePathsToInclude, filterFiles } from './filters';
import { getFilePaths, getIndexFilePath } from './paths';

export const assignIndexFilePath = ({ parentPath }) => {
  const filePath = getIndexFilePath(parentPath);

  return { parentPath, filePath };
};

export const assignIndexFileData = async ({ parentPath, ...context }) => {
  const fileData = await processIndexFileData(parentPath);

  return { ...context, fileData };
};

export const assignDirEnts = async ({ parentPath }) => {
  const dirEnts = await getDirEnts(parentPath);

  return { parentPath, dirEnts };
};

export const assignFilteredFiles = ({ dirEnts, ...context }) => {
  const files = filterFiles(dirEnts);

  return { ...context, files };
};

export const assignFilePaths = ({ files, ...context }) => {
  const filePaths = getFilePaths(files);

  return { ...context, filePaths };
};

export const assignFilteredFilePaths = ({ filePaths: rawFilePaths, ...context }) => {
  const filePaths = filterFilePathsToInclude(rawFilePaths);

  return { ...context, filePaths };
};
