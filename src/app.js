const http = require('http');
const path = require('path');

// 自定义的配置文件
const conf = require('./config/defaultConfig');

// chalk 第三方模块, 用于在终端中输出带颜色的信息
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
            let filePath;
            if (req.url.endsWith('.svg')) {
                // 如果是请求svg文件,则不拼接路径,svg已是绝对路径
                filePath = req.url;
            } else {
                // 使用path.join 拼接路径
                filePath = path.join(this.conf.root, req.url);
                console.info(filePath);
            }
            route(req, res, filePath, this.conf);
        });

        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`node 服务运行在 ${chalk.green(addr)}`);
            openBrowser(addr);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') { // 端口已经被使用
                console.info(chalk.red('这个端口【' + this.conf.port + '】已经被占用'));
            }
        });
    }
}

module.exports = Server;
