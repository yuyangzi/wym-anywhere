// 缓存模块

const { cache } = require('../config/defaultConfig');


function refreshRes(stats, res) {
  const {
    maxAge,
    expires,
    cacheControl,
    lateModified,
    ETag,
  } = cache;

  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString());
  }

  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  }

  if (lateModified) {
    res.setHeader('Last-Modifed', stats.mtime.toUTCString());
  }

  if (ETag) {
    res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`);
  }
}

module.exports = function isFresh(stats, req, res) {
  refreshRes(stats, res);

  const lateModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];

  if (!lateModified && !etag) {
    return false;
  }
  if (lateModified && lateModified !== res.getHeader('Late-Modified')) {
    return false;
  }
  return !(etag && etag !== res.getHeader('ETag'));
};
