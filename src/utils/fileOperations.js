import fs from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import isFile from './isFile.js';

export async function readFile(filePath) {
  const absolutePath = path.resolve(filePath);

  try {
    if (isFile(absolutePath)) {
      // const stream = fs.createReadStream(absolutePath, { encoding: "utf8" });
      // stream.on('data', (chunk) => {
      //   process.stdout.write(chunk);
      // });

      // stream.on('error', () => {
      //   console.log(`Operation failed`);
      // });

      await pipeline(fs.createReadStream(absolutePath), process.stdout, { end: false });
    }
  } catch {
    console.log(`Operation failed`);
  }
};
