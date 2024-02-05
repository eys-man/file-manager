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
import { compressFile, decompressFile } from './zip.js';
import { getOsInfo } from './os.js';

export default async function parseCommand(str, stream) {
  const [command, ...args] = str.split(' ');
    // console.log(`command=${command}, args=${args}`);

    switch (command.toLowerCase()) {
      case '.exit':
        // console.log(`введен .exit`);
        stream.close();
        break;
      case 'cd':
        await cd(args[0]);
        break;
      case 'up':
        // console.log(`на один уровень вверх`);
        await cd('..');
        break;
      case 'ls':
        await ls();
        break;
      case 'cat':
        // console.log(`прочитать файл по пути '${args[0]}'`);
        await readFile(args[0]);
        break;
      case 'add':
        // console.log(`создать файл по пути '${args[0]}'`);
        await addFile(args[0]);
        break;
      case 'rn':
        // console.log(`переименовать файл по пути '${args[0]}' в '${args[1]}'`);
        await renameFile(args[0], args[1]);
        break;
      case 'cp':
        // console.log(`скопировать файл по пути '${args[0]}' в '${args[1]}'`);
        await copyFile(args[0], args[1]);
        break;
      case 'mv':
        // console.log(`переместить файл из '${args[0]}' в '${args[1]}'`);
        await moveFile(args[0], args[1]);
        break;
      case 'rm':
        // console.log(`удалить файл по пути '${args[0]}'`);
        await removeFile(args[0]);
        break;
      case 'hash':
        // console.log(`вывести хэш файла по пути '${args[0]}'`);
        await hashFile(args[0]);
        break;
      case 'compress':
        // console.log(`сжать файл '${args[0]}' в '${args[1]}'`);
        await compressFile(args[0], args[1]);
        break;
      case 'decompress':
        // console.log(`распаковать файл '${args[0]}' в '${args[1]}'`);
        await decompressFile(args[0], args[1]);
        break;
      case 'os':
        // console.log(`получить информацию по системе`);
        await getOsInfo(args[0]);
        break;
      default:
        console.log(`Invalid input`);
        break;
    };
}
