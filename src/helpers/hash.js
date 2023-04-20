import fs from "fs";
import crypto from "crypto";

export const calcHash = (pathToFile) => {
  fs.readFile(pathToFile, {encoding: 'utf8'}, (err, data) => {
    if (err) console.error('Operation failed');
    const result = crypto.createHash('SHA256').update(data).digest('hex');
    console.log('hash: ', result);
  });
}
