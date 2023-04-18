import path from "path";
import fs from "fs";

export const goUpper = (rootDir) => {
  const parentDir = path.dirname(process.cwd()).split(path.sep).join(path.sep);
  if (!parentDir.includes(rootDir)) {
    console.error(`You can't go upper than root directory: ${rootDir}`);
  } else {
    process.chdir(parentDir);
  }
}

export const goToDir = (pathToDir) => {
  if (!pathToDir) {
    console.error('Write path you want to move to');
  } else {
    if (!path.isAbsolute(pathToDir)) {
      pathToDir = path.resolve(process.cwd(), pathToDir);
    }
    process.chdir(pathToDir);
  }
}

export const getList = () => {
  fs.readdir(process.cwd(), (err, data) => {
    if (err) console.error('Operation failed');
    const structData = [];
    data
      .filter(el => fs.lstatSync(path.join(process.cwd(), el)).isDirectory())
      .sort((a, b) => sortByName(a, b))
      .map(el => structData.push({ Name: el, Type: 'directory' }));
    data
      .filter(el => fs.lstatSync(path.join(process.cwd(), el)).isFile())
      .sort((a, b) => sortByName(a, b))
      .map(el => structData.push({ Name: el, Type: 'file' }));
    console.table(structData);
  });
};

const sortByName = (a, b) => {
  const nameA = a.toLowerCase(), nameB = b.toLowerCase();
  if (nameA < nameB)
    return -1;
  if (nameA > nameB)
    return 1;
  return 0;
}
