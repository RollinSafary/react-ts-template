// removes template related files from the project and this script as well
const shell = require("shelljs");
const fs = require("fs");
const packageJSON = require("../package.json");

const assetsPath = "./scripts/assets/removeTemplate";
const publicPath = "./public";

function cleanTemplateFiles() {
  shell.exec(`rm -rf ${publicPath}`);
  shell.mkdir(["public", "public/assets", "public/assets/logo"]);
}

function copyProjectSpecificFiles() {
  shell.exec(`cp ${assetsPath}/template.html ${publicPath}/index.html`);
  shell.exec(
    `cp ${assetsPath}/manifest.json ${publicPath}/assets/manifest.json`
  );
  shell.exec(`cp ${assetsPath}/favicon.ico ${publicPath}/assets/favicon.ico`);
  shell.exec(
    `cp ${assetsPath}/logo192.png ${publicPath}/assets/logo/logo192.png`
  );
}

function updateHtmlFile() {
  let file = fs.readFileSync(`${publicPath}/index.html`, "utf-8");
  shell.exec(`rm -rf ${publicPath}/index.html`);
  file = file
    .replace("{{description}}", packageJSON.description)
    .replace("{{project-name}}", packageJSON.displayName);
  fs.writeFileSync(`${publicPath}/index.html`, file, "utf-8");
}

function removePrepareScript() {
  let packageText = fs.readFileSync("./package.json", "utf-8");
  packageText = packageText.replace(
    `"prepare": "node scripts/removeTemplate.js",`,
    ""
  );
  fs.writeFileSync("./package.json", packageText);
  shell.exec("rm -rf ./scripts/removeTemplate.js");
  shell.exec("rm -rf ./scripts/assets/removeTemplate");
}

function stageChanges() {
  shell.exec("git add .");
  console.warn("Changes staged!");
}

function execute() {
  cleanTemplateFiles();
  copyProjectSpecificFiles();
  updateHtmlFile();
  removePrepareScript();
  stageChanges();
}

execute();
