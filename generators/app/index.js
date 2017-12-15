
const Gen = require('yeoman-generator');
const fs = require('fs');
const mkdirp = require('mkdirp');
const cmd = require('child_process');
const tpl = require('./templates/tpl');

module.exports = class extends Gen {
  constructor(args, opts) {
    super(args, opts);
  }
  prompting () {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: '请输入文件夹名称',
    }]).then((res) => {
      const path = this.destinationPath(res.name);

      fs.exists(path, (e) => {
        if (!e) {
          // 创建目标文件夹
          mkdirp(res.name, (err) => (!!err && this.log(err)));

          //目标文件夹下创建 list 文件夹
          mkdirp(`${path}/list`, (err) => (!!err && this.log(err)));

          //目标文件夹下创建 add 文件夹
          mkdirp(`${path}/add`, (err) => (!!err && this.log(err)));

          //目标文件夹下创建 edit 文件夹
          mkdirp(`${path}/edit`, (err) => (!!err && this.log(err)));

          //目标文件夹下创建 server 文件
          const viewPath = path.replace(path.split(/components|component/)[0], '').split('/').slice(1).join('/');
          this.fs.write(`${path}/server.js`, tpl.server());
          ['list', 'add', 'edit'].forEach((v) => {
            this.fs.write(`${path}/${v}/view.jsx`, tpl[v](res.name, `'${viewPath}/${v}'`));
            this.fs.write(`${path}/${v}/action.js`, tpl.action());
            this.fs.write(`${path}/${v}/types.js`, tpl.types());
            this.fs.write(`${path}/${v}/saga.js`, tpl.saga());
            this.fs.write(`${path}/${v}/reducers.js`, tpl.reducer());
            this.fs.write(`${path}/${v}/me.json`, "{}");
          });
          // cmd.exec(`git add .`);
        } else {
          this.log('该文件夹已经存在');
        }
      });
    })
  }

};