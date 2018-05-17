
const Gen = require('yeoman-generator');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { exec } = require('shelljs');
const glob = require('glob');
const latestVersion = require('latest-version');
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
      exec('npm ls rrc-loader-helper');
      latestVersion('rrc-loader-helper').then(version => {
        console.log(version);
      });
      fs.exists(path, (e) => {
        if (!e) {
          const viewPath = path.replace(path.split(/components|component/)[0], '').split('/').slice(1).join('/');

          this.fs.write(`${path}/view.jsx`, tpl.list(res.name, `'${viewPath}'`));
          this.fs.write(`${path}/action.js`, tpl.action());
          this.fs.write(`${path}/types.js`, tpl.types());
          this.fs.write(`${path}/saga.js`, tpl.saga());
          this.fs.write(`${path}/reducers.js`, tpl.reducer());
          this.fs.write(`${path}/me.json`, "{}");

          // cmd.exec(`git add .`);
        } else {
          this.log('该文件夹已经存在');
        }
      });
    })
  }

};