const fs = require('fs');
const path = require('path');

const icons = {
    'doc': 'word',
    'docx': 'word',
    'ppt': 'powerpoint',
    'pptx': 'powerpoint',
    'xls': 'excel',
    'xlsx': 'excel',
    'pdf': 'pdf',
    'html': 'html',
    'js': 'js',
    'json': 'json',
    'css': 'css',
    'py': 'css',
    'php': 'python',
    'mp4': 'video',
    'avi': 'video',
    'jpeg': 'image',
    'jpg': 'image',
    'png': 'image',
    'gif': 'image',
    'zip': 'zip',
    'rar': 'zip',
    'txt': 'text',
    'md': 'markdown',
};

module.exports = async (_filePath, files) => {
    const _files = await files.map(item => {
        const filePath = path.join(_filePath, item);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            return {
                name: item,
                svg: 'default_folder'
            };
        }
        if (stats.isFile()) {
            const ext = path.extname(filePath).split('.').pop().toLocaleLowerCase();
            return {
                name: item,
                svg: icons[ext] || 'default'
            };
        }
    });
    return _files;
};
