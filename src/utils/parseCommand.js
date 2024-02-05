import { cd, ls } from './navigation.js'

export default async function parseCommand(str, stream) {
  const [command, ...args] = str.split(' ');
    console.log(`command=${command}, args=${args}`);

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
      default:
        console.log(`Invalid input`);
        break;
    };
}
