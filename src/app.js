const http = require('http');
const path = require('path');

// 自定义的配置文件
const conf = require('./config/defaultConfig');

const chalk = require('chalk');

// 路由文件
const route = require('./helper/route');

const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url);
    route(req,res, filePath);
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`node 服务运行在 ${chalk.green(addr)}`);
});
