import zlib from "zlib";
import fs from "fs";

export const compress = (sourceFile, destinationFile) => {
  const isExist = fs.existsSync(sourceFile);

  if (isExist) {
    const readStream = fs.createReadStream(sourceFile)
      .on("error", () => console.error('Operation failed'));
    const writeStream = fs.createWriteStream(destinationFile)
      .on("error", () => console.error('Operation failed'));

    const brotli = zlib.createBrotliCompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
      console.log('Done compressing');
    });
  } else {
    console.error('Operation failed');
  }
}

export const decompress = (sourceFile, destinationFile) => {
  const isExist = fs.existsSync(sourceFile);

  if (isExist) {
    const readStream = fs.createReadStream(sourceFile)
      .on("error", () => console.error('Operation failed'));
    const writeStream = fs.createWriteStream(destinationFile)
      .on("error", () => console.error('Operation failed'));

    const brotli = zlib.createBrotliDecompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
      console.log('Done decompressing');
    });
  } else {
    console.error('Operation failed');
  }
}
