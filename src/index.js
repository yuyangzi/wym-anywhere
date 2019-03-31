const yargs = require('yargs');

const Server = require('./app');

const { getIPAddress } = require('./helper/util');

const { argv } = yargs.usage('wym-anywhere [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: 8000,
  })
  .option('h', {
    alias: 'hostname',
    describe: 'host',
    default: getIPAddress(),
  })
  .option('d', {
    alias: 'root',
    describe: 'root path',
    default: process.cwd(),
  })
  .version()
  .alias('v', 'version')
  .help();

const server = new Server(argv);

server.start();
