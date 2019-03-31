// 压缩模块
const {
  createGzip,
  createDeflate,
} = require('zlib');

module.exports = (rs, req, res) => {
  // 获取浏览器支持的解压算法
  const acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)/)) {
    return rs;
  }
  if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip');
    return rs.pipe(createGzip());
  }
  if (acceptEncoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding', 'deflate');
    return rs.pipe(createDeflate());
  }
  return null;
};
