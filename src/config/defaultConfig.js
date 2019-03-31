// moexports
module.exports = {
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 9000,
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lateModified: true,
    ETag: true,
  },
};
