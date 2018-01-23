const {
    cache
} = require('../config/defaultConfig');


function refreshRes(stats, res) {
    const {
        maxAge,
        expires,
        cacheControl,
        lateModifed,
        etag
    } = cache;

    if (expires) {
        res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString());
    }

    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    }

    if (lateModifed) {
        res.setHeader('Last-Modifed', stats.mtime.toUTCString());
    }

    if (etag) {
        res.setHeader('ETag', `${stats.size}-${stats.mtime}`);
    }
}

module.exports = function isFresh(stats, req, res) {
    refreshRes(stats, res);

    const lateModifed = req.headers['if-modifed-since'];
    const etag = req.headers['if-none-match'];

    if (!lateModifed && !etag) {
        return false;
    } else if (lateModifed && lateModifed !== res.getHeader('Late-Modifed')) {
        return false;
    } else if (etag && etag !== res.getHeader('ETag')) {
        return false;
    } else {
        return true;
    }
};
