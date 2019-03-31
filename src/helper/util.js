const os = require('os');

module.exports = {
  getIPAddress: () => {
    const ifaces = os.networkInterfaces();
    let ip = '';
    const details = Object.values(ifaces);
    details.forEach((detail) => {
      if (ip === '' && detail.family === 'IPv4' && !detail.internal) {
        ip = detail.address;
      }
    });
    return ip || '127.0.0.1';
  },
};
