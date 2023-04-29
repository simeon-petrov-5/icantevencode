import fs from 'fs';
import path from 'path';

function getTotalCssSize(dir) {
  let totalSize = 0;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && filePath.split('/').length < 4) {
      // If the file is a directory and the depth is less than 4, recurse
      totalSize += getTotalCssSize(filePath);
    } else if (path.extname(filePath) === '.css') {
      // If the file is a CSS file, add its size to the total
      totalSize += stat.size;
    }
  }

  return totalSize;
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const directoryPath = './dist';
const totalCssSize = getTotalCssSize(directoryPath);

console.log(`Total CSS size in ${directoryPath}: ${formatBytes(totalCssSize)} bytes`);