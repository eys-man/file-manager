import { readdir, stat } from 'fs/promises';

export function cd(path) {
  try {
    process.chdir(path);
  } catch {
    console.log(`Operation failed`);
  }
}

export async function ls() {
  try {
    const files = await readdir(process.cwd());
    
    //console.table(files);
    let filesInfo = [];
    // let dirInfo = [];
    files.forEach(async file => {
      // получить атрибуты файла (файл или каталог, в частности)
      const stats = await stat(file);
      const isDir = stats.isDirectory() ? 'directory' : 'file';
      
      // if (isDir === 'file') 
      filesInfo.push(file, isDir);
      // console.log(`файл: ${file}, stat=${isDir}`);
    });
    console.table(filesInfo);
    // или так
    // for (const file of files) console.log(file);
  } catch (err) {
    console.log(`error ls. ${err}. Operation failed`);
  }
}
