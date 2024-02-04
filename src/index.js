import { EventEmitter } from 'events';
import readline from 'readline';
import os from 'os';
import { chdir } from 'process';

// разобрать командную строку (через argv) для определения имени пользователя
let userName = '';
if (process.argv.length <= 3 || process.argv[2] !== '--') userName = 'stranger';
else userName = process.argv[3].slice(2).startsWith('username=') ?
  process.argv[3].slice(11) : 'stranger';

console.log(`Welcome to the File Manager, ${userName}`);

process.chdir(os.homedir()); // перейти в папку пользователя
console.log(`You are currently in '${process.cwd()}'`);

const userInterface = readline.createInterface(process.stdin, process.stdout);

userInterface
  .on('line', (input) =>
  {
    console.log(`было введено '${input}'`);
    // TODO: разбор введенного
  })
  .on('SIGINT', () => userInterface.close())
  .on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0)
  });
