const os = require('os');

module.exports = {
    getIPAddress: () => {
        const ifaces = os.networkInterfaces();
        let ip = '';
        for (const dev in ifaces) {
            ifaces[dev].forEach(details => {
                // 当ip地址没有被确定,且是'IPv4'类型且不是loopback或相似的远程能用的接口时
                if (ip === '' && details.family === 'IPv4' && !details.internal) {
                    ip = details.address;
                    return;
                }
            });
        }
        return ip || '127.0.0.1';
    },
};
