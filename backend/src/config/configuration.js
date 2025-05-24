const yaml = require('js-yaml');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');


//Lee el fichero de configuración
let configFIle = 'config.local.yaml';
const argv = yargs(hideBin(process.argv)).argv;
if(argv.config != undefined) {
    configFIle = argv.config;
}
const config = yaml.load(fs.readFileSync(configFIle, 'utf-8'));

module.exports = {
    config
}