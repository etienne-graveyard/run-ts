import path from 'path';
import { register } from 'ts-node';
import fse from 'fs-extra';

export async function command(argv: Array<string>) {
  const scriptsFolder = path.resolve(process.cwd(), 'scripts');
  const scriptsName = process.env.npm_lifecycle_event;
  const scriptsPath = path.resolve(scriptsFolder, scriptsName + '.ts');
  const tsconfigPath = path.resolve(scriptsFolder, 'tsconfig.json');
  const args = argv.slice(2);

  if (!fse.existsSync(tsconfigPath)) {
    console.error('Missing tsconfig.json in scripts folder');
    return;
  }

  if (!fse.existsSync(scriptsPath)) {
    console.error(`Missing script file scripts/${scriptsName + '.ts'}`);
    return;
  }

  register({
    dir: scriptsFolder,
    project: tsconfigPath,
  });

  const command = require(scriptsPath);
  if (command && command.default && typeof command.default === 'function') {
    command.default(args);
  }
}
