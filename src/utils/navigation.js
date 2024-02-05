import { readdir, stat } from 'fs/promises';

export async function cd(path) {
  try {
    process.chdir(path);
  } catch {
    console.log(`Operation failed`);
  }
}

function compareFiles(a, b) {
  if (a.Type === 'directory' && b.Type === 'directory')
    if (a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
    else return 1;
  
  if (a.Type === 'directory' && b.Type === 'file') return -1;
  
  if (a.Type === 'file' && b.Type === 'directory') return 1;
  
  if (a.Type === 'file' && b.Type === 'file')
    if (a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
    else return 1;
}

export async function ls() {
  try {
    const files = await readdir(process.cwd());
    
    let filesInfo = [];

    for (const Name of files) {
      try {
        const stats = await stat(Name);
        const Type = stats.isDirectory() ? 'directory' : 'file';
        filesInfo.push({Name, Type});
      } catch (err) {
        console.log(``);
      }
    }
    // отсортировать массив
    filesInfo.sort(compareFiles);

    console.table(filesInfo);
  } catch (err) {
    console.log(err);
    console.log(`Operation failed`);
  }
}
