'use strict';

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const document = process.argv[2];
const title = process.argv[3] || document;
const docuemntsPath = path.resolve(__dirname, '../../documents');
const Files = [
  {
    filename: path.join(docuemntsPath, `docs/zh-CN/${document}.md`),
    content: `## ${title}`
  },
  {
    filename: path.join(docuemntsPath, `docs/en-US/${document}.md`),
    content: `## ${title}`
  }
];

// 创建 package
Files.forEach(file => {
  fileSave(file.filename).write(file.content, 'utf8').end('\n');
});

// 添加到 nav.config.json
const navConfigFile = require('../../documents/nav.config.json');

Object.keys(navConfigFile).forEach(lang => {
  // 在组件的导航菜单中添加导航信息
  let groups = navConfigFile[lang][2].groups;
  groups[groups.length - 1].list.push({
    path: `/${document}`,
    title: ` ${title}`
  });
});

fileSave(path.join(__dirname, '../../documents/nav.config.json'))
  .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
  .end('\n');

console.log('DONE!');
