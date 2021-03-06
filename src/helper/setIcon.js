const fs = require('fs');
const path = require('path');

const icons = {
  doc: 'word',
  docx: 'word',
  ppt: 'powerpoint',
  pptx: 'powerpoint',
  xls: 'excel',
  xlsx: 'excel',
  pdf: 'pdf',
  html: 'html',
  js: 'js',
  json: 'json',
  css: 'css',
  py: 'python',
  php: 'php',
  mp4: 'video',
  avi: 'video',
  jpeg: 'image',
  jpg: 'image',
  png: 'image',
  gif: 'image',
  zip: 'zip',
  rar: 'zip',
  txt: 'text',
  md: 'markdown',
  c: 'c',
  cpp: 'cpp',

};

module.exports = async (_filePath, files) => {
  const fileList = await files.map((item) => {
    const filePath = path.join(_filePath, item);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      return {
        name: item,
        svg: 'file_type_default_folder.svg',
      };
    }
    if (stats.isFile()) {
      const ext = path.extname(filePath).split('.').pop().toLocaleLowerCase();
      const svgPath = icons[ext] ? `file_type_${icons[ext]}.svg` : 'file_type_default.svg';
      return {
        name: item,
        svg: svgPath,
      };
    }
    return null;
  });
  return fileList;
};
