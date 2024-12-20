import config from './config.json';
import { processIndexFiles } from './processors';

const main = async () => {
  const { parentPaths } = config;

  const indexFiles = await processIndexFiles(parentPaths);
};

main();
