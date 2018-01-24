const http = require('http');
const path = require('path');

// 自定义的配置文件
const conf = require('./config/defaultConfig');

const chalk = require('chalk');

// 路由文件
const route = require('./helper/route');

const openBrowser = require('./helper/openBrowser');


class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config);
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            route(req, res, filePath, this.conf);
        });

        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`node 服务运行在 ${chalk.green(addr)}`);
            openBrowser(addr);
        });
    }
}

module.exports = Server;
