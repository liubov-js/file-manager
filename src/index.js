import readline from 'readline';
import * as os from "os";
import { getList, goToDir, goUpper } from "./helpers/navigation.js";
import { copy, createFile, move, readFile, remove, rename } from "./helpers/files.js";
import { calcHash } from "./helpers/hash.js";
import { compress, decompress } from "./helpers/compress-decompress.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const argWithUserName = process.argv.find(arg => arg.startsWith('--username=')) || '--username=user';

const userName = argWithUserName.slice(11);

console.log(`Welcome to the File Manager, ${userName}!`);

const prompt = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

let query = '';
const awaitedQuery = async () => query = await prompt('');

(async() => {
  try {
    const rootDir = os.homedir();

    while (true) {
      await awaitedQuery();

      if (query === 'up') {
        goUpper(rootDir);
      } else if (query.startsWith('cd ')) {
        let pathToDir = query.replace('cd ', '');
        goToDir(pathToDir);
      } else if (query === 'ls') {
        getList();
      } else if (query.startsWith('cat ')) {
        let pathToFile = query.replace('cat ', '');
        readFile(pathToFile);
      } else if (query.startsWith('add ')) {
        let newFileName = query.replace('add ', '');
        createFile(newFileName);
      } else if (query.startsWith('rn ')) {
        const commandChunks = query.split(' ');
        if (commandChunks.length === 3) {
          rename(commandChunks[1], commandChunks[2]);
        } else {
          console.error('Invalid input');
        }
      } else if (query.startsWith('cp ')) {
        const commandChunks = query.split(' ');
        if (commandChunks.length === 3) {
          copy(commandChunks[1], commandChunks[2]);
        } else {
          console.error('Invalid input');
        }
      } else if (query.startsWith('mv ')) {
        const commandChunks = query.split(' ');
        if (commandChunks.length === 3) {
          move(commandChunks[1], commandChunks[2]);
        } else {
          console.error('Invalid input');
        }
      } else if (query.startsWith('rm ')) {
        const commandChunks = query.split(' ');
        if (commandChunks.length === 2) {
          remove(commandChunks[1]);
        } else {
          console.error('Invalid input');
        }
      } if (query.startsWith('os ')) {
        const commandChunks = query.split(' ');
        switch (commandChunks[1]) {
          case '--EOL':
            console.log('Default system End-Of-Line: ', JSON.stringify(os.EOL));
            break;
          case '--cpus':
            console.log('Overall amount of CPUS: ', os.cpus().length);
            os.cpus().map(cpu => console.log(cpu.model));
            break;
          case '--homedir':
            console.log(rootDir);
            break;
          case '--username':
            console.log(os.userInfo().username);
            break;
          case '--architecture':
            console.log(os.arch())
            break;
          default:
            console.log('Invalid input');
        }
      } else if (query.startsWith('hash ')) {
        const commandChunks = query.split(' ');
        if (commandChunks.length === 2) {
          calcHash(commandChunks[1]);
        } else {
          console.error('Invalid input');
        }
      } else if (query.startsWith('compress ')) {
        const commandChunks = query.split(' ');
        if (commandChunks.length === 3) {
          compress(commandChunks[1], commandChunks[2]);
        } else {
          console.error('Invalid input');
        }
      } else if (query.startsWith('decompress ')) {
        const commandChunks = query.split(' ');
        if (commandChunks.length === 3) {
          decompress(commandChunks[1], commandChunks[2]);
        } else {
          console.error('Invalid input');
        }
      } else if (query === '.exit') {
        rl.close();
      } else {
        console.log('Invalid input');
      }

      console.log(`You are currently in ${process.cwd()}`); // TODO
    }
  } catch (e) {
    console.error("Unable to prompt", e);
  }
})();

rl.on("close", () => {
  console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
