const fs = require('fs');

async function readDirectory(limit) {
  const pathToDirectory = 'public/uploads';
  try {
    const files = await fs.readdirSync(pathToDirectory);
    return files.slice(0, limit).map((file) => ({
      codeFileName: file,
    }));
  } catch (error) {
    console.log(error);
  }
}

async function readFileOfDirectory(pathToFile) {
  try {
    const fileContent = await fs.readFileSync(pathToFile, 'utf8');
    return fileContent;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  readDirectory,
};
