// Based on https://github.com/nodegui/qode/blob/master/npm/install.js

const path = require('path');
const os = require('os');
const fs = require('fs');
const { version } = require('./package.json');

const got = require('got');
const extract = require('extract-zip');

// VARIABLES
const platform = os.platform();
const arch = 'x64';
const libVersion = version;
const binaryFileName = 'nodegui_plugin_svg.node';
const archiveFileName = `${platform}-${arch}.zip`;
const downloadLink =
  `https://github.com/Ty3uK/nodegui-plugin-svg/releases/download/v${libVersion}/${archiveFileName}`;
const targetPath = __dirname;
const archiveTargetPath = path.join(targetPath, archiveFileName);
const binaryTargetPath = path.join(targetPath, binaryFileName);

const isExists = async (checkPath) => {
  try {
    await fs.promises.access(checkPath);
    return true;
  } catch {
    return false;
  }
}

const extractZip = async (source, targetDir) => {
  return new Promise((resolve, reject) => {
    extract(source, { dir: targetDir }, function(err) {
      err ? reject(err) : resolve(true);
    });
  });
};

const downloadFile = async (url, targetFilePath, options) => {
  const writeStream = fs.createWriteStream(targetFilePath);
  
  return await new Promise((resolve, reject) => {
    const downloadStream = got.stream(url, options);
    downloadStream.pipe(writeStream);
    downloadStream.on("error", reject);
    writeStream.on("error", reject);
    writeStream.on("close", () => resolve());
  });
};

const downloadArchiveFromGithub = async () => {
  console.log("Downloading from: ", downloadLink);
  await downloadFile(downloadLink, archiveTargetPath, { stream: true });
};

const extractBinaries = async () => {
  console.log("Extracting binaries...");
  await extractZip(archiveTargetPath, targetPath);
  await fs.promises.unlink(archiveTargetPath);
};

(async () => {
  const exists = await isExists(binaryTargetPath);
  
  if (exists) {
    return;
  }

  try {
    await downloadArchiveFromGithub();
    await extractBinaries();
  } catch (error) {
    console.error(error);
    console.error(`Failed to install nodegui-svg-plugin-v${libVersion}`);
    process.exit(1);
  }
})();
