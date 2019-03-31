// 导入child_process 里的exec函数用于使用系统默认浏览器打开url地址
const {
  exec,
} = require('child_process');

module.exports = (url) => {
  // 使用process.platform 判断当前的操作系统.
  switch (process.platform) {
    // Mac OS 下使用open 打开URL地址
    case 'darwin':
      exec(`open ${url}`);
      break;
    // windows 下使用start 打开URL地址
    case 'win32':
      exec(`start ${url}`);
      break;
    default:
      break;
  }
};
