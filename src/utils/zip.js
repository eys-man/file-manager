import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import isFile from './isFile.js';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export async function compressFile(sourcePath, destinationPath) {
  const absSourcePath = path.resolve(sourcePath);
  const absDestinationPath = path.resolve(destinationPath);

  try {
    if (isFile(absSourcePath)) {
      const inputStream = fs.createReadStream(absSourcePath);
      const outputStream = fs.createWriteStream(absDestinationPath);
      const brotliCompressStream = createBrotliCompress();
      await pipeline(inputStream, brotliCompressStream, outputStream);
    }
  } catch {
    console.log(`Operation failed`);
  }
};

export async function decompressFile(sourcePath, destinationPath) {
  const absSourcePath = path.resolve(sourcePath);
  const absDestinationPath = path.resolve(destinationPath);

  try {
    if (isFile(absSourcePath)) {
      const inputStream = fs.createReadStream(absSourcePath);
      const outputStream = fs.createWriteStream(absDestinationPath);
      const brotliDecompressStream = createBrotliDecompress();
      await pipeline(inputStream, brotliDecompressStream, outputStream);
    }
  } catch {
    console.log(`Operation failed`);
  }
};
