const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

// 模板文件夹所在地址
const tplPath = path.join(__dirname, '../template');

const source = fs.readFileSync(path.join(tplPath, 'dir.html')).toString();
// 模板引擎
const Handlebars = require('handlebars');

const conf = require('../config/defaultConfig');

const mime = require('../helper/mime');

const compress = require('../helper/compress');

// 文件夹目录显示模板
const dirTemplate = Handlebars.compile(source);

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            const mimeType = mime(filePath);
            res.setHeader('Content-Type', `${mimeType}; charset=UTF-8`);
            let rs = fs.createReadStream(filePath);
            if (filePath.match(conf.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            const dir = path.relative(conf.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            };
            res.end(dirTemplate(data));
        }
    } catch (error) {
        console.info(error);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
        res.end(`${filePath} 这个地址找不到\n 错误信息: \n${error}`);
    }
};
