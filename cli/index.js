const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
// Note: Yargs exposes the helper hideBin, which handles the process.argv.slice logic for you.

const modulesPath = path.join(__dirname, 'modules');

const [, , command] = process.argv;

requireModuleForCommand(command);

// yargs.command(hideBin(process.argv), "", (yargs) => {
//   yargs
//     .check((argv) => {
//       const targetModulePath = path.join(modulesPath, argv._[0]);
//       if (!fs.existsSync(targetModulePath)) throw new Error("Invalid Command!");
//       require(targetModulePath);
//       return true;
//     })
// }).argv;

function requireModuleForCommand(command) {
  try {
    if (!command) throw new Error('No Command!');
    const targetModulePath = path.join(modulesPath, command);
    if (!fs.existsSync(targetModulePath)) throw new Error('Invalid Command!');
    require(targetModulePath);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    console.log(getSupportedCommands());
  }
}

function getSupportedCommands() {
  const moduleDirs = fs.readdirSync(modulesPath);
  return ['These are the supported commands:', ...moduleDirs].join('\n');
}
