import path from 'path';
import fs from 'fs/promises';

export default async function isFile(filePath) {
  const absolutePath = path.resolve(filePath);
  try {
    const stats = await fs.stat(absolutePath);
    return stats.isFile();
  } catch {
    return false;
  }
}
