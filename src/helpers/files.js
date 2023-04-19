import path from "path";
import fs from "fs";

export const readFile = (pathToFile) => {
  fs.createReadStream(pathToFile).pipe(process.stdout);
  console.log('\n');
}

export const createFile = (newFileName) => {
  const pathToFile = path.join(process.cwd(), newFileName);
  const isFileExist = fs.existsSync(pathToFile);

  if (isFileExist) {
    console.error('File already exists');
  } else {
    fs.writeFile(pathToFile, '', (err) => {
      if (err) console.error('Operation failed');
    });
  }
}

export const rename = (pathToFile, newFileName) => {
  const pathToDir = pathToFile.split(path.sep);
  pathToDir.pop();
  const newPath = path.join(pathToDir.join(path.sep), newFileName);

  if (fs.existsSync(pathToFile) && !fs.existsSync(newPath)) {
    fs.rename(pathToFile, newPath, (err) => {
      if (err) console.error('Operation failed');
    });
  } else {
    console.error('File already exists');
  }
}

export const copy = (pathToFile, pathToNewDir) => {
  const fileName = pathToFile.split(path.sep).pop();
  const writable = fs.createWriteStream(path.join(pathToNewDir, fileName), {encoding: 'utf8'})
  fs.createReadStream(pathToFile).pipe(writable);
  // TODO errors handling???
}

export const move = (pathToFile, pathToNewDir) => {
  copy(pathToFile, pathToNewDir);
  remove(pathToFile);
}

export const remove = (pathToFile) => {
  fs.unlink(pathToFile, (err) => {
    if (err) console.error('Operation failed');
  });
}
