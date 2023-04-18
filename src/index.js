import readline from 'readline';
import * as os from "os";
import { getList, goToDir, goUpper } from "./helpers/navigation.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const argWithUserName = process.argv.find(arg => arg.startsWith('--username=')); // TODO: improve in package.json

if (!argWithUserName) {
  // TODO
}

const userName = argWithUserName.slice(11);

console.log(`Welcome to the File Manager, ${userName}!`);

const prompt = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

let query = '';
const awaitedQuery = async () => query = await prompt('');

(async() => {
  try {
    const rootDir = os.homedir();
    // const currentDir = process.cwd();

    while (true) {
      await awaitedQuery();

      if (query === 'up') {
        goUpper(rootDir);
      } else if (query.startsWith('cd ')) {
        let pathToDir = query.replace('cd ', '');
        goToDir(pathToDir);
      } else if (query === 'ls') {
        getList();
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
