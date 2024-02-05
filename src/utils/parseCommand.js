import {
  readFile,
  addFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile
} from './fileOperations.js';
import { cd, ls } from './navigation.js';
import { hashFile } from './hashFile.js';
// import { compressFile, decompressFile } from './zip.js';
import { brotli } from './zip.js';
import { getOsInfo } from './os.js';

export default async function parseCommand(str, stream) {
  const [command, ...args] = str.split(' ');

    switch (command.toLowerCase()) {
      case '.exit':
        stream.close();
        break;
      case 'cd':
        await cd(args[0]);
        break;
      case 'up':
        await cd('..');
        break;
      case 'ls':
        await ls();
        break;
      case 'cat':
        await readFile(args[0]);
        break;
      case 'add':
        await addFile(args[0]);
        break;
      case 'rn':
        await renameFile(args[0], args[1]);
        break;
      case 'cp':
        await copyFile(args[0], args[1]);
        break;
      case 'mv':
        await moveFile(args[0], args[1]);
        break;
      case 'rm':
        await removeFile(args[0]);
        break;
      case 'hash':
        await hashFile(args[0]);
        break;
      case 'compress':
        // await compressFile(args[0], args[1]);
        await brotli(args[0], args[1], 'compress');
        break;
      case 'decompress':
        // await decompressFile(args[0], args[1]);
        await brotli(args[0], args[1], 'decompress');
        break;
      case 'os':
        await getOsInfo(args[0]);
        break;
      default:
        console.log(`Invalid input`);
        break;
    };
}
