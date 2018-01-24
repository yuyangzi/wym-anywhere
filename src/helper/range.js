module.exports = (totalSize, req, res) => {
    const range = req.headers['range'];
    if (!range) {
        return {
            code: 200
        };
    } else {
        const sizes = range.match(/bytes=(\d*)-(\d*)/);
        const end = sizes[2] || totalSize - 1;
        const start = sizes[1] || totalSize - end;

        if (start > end || start < 0 || end > totalSize) {
            return {
                code: 200,
            };
        } else {
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`);
            res.setHeader('Conent-Length', end - start);
            return {
                code: 206,
                start: parseInt(start, 10),
                end: parseInt(end, 10)
            };
        }
    }
};