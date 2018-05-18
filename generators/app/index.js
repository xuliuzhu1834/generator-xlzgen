
const Gen = require('yeoman-generator');
const fs = require('fs');
const tpl = require('./templates/tpl');
const TPL_FLAG = require('./version');


module.exports = class extends Gen {
  constructor(args, opts) {
    super(args, opts);
    if (TPL_FLAG.errors.length) {
      this.log(`${TPL_FLAG.errors.join('\n')}\n将以默认方式生成模版`);
    }
  }
  prompting () {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: '请输入文件夹名称',
    }]).then((res) => {
      const filePath = this.destinationPath(res.name);
      const { reactType, rrcLoaderType, isTypeLoaderExist, reducerName } = TPL_FLAG;
      fs.exists(filePath, (e) => {
        if (!e) {
          const viewPath = filePath.replace(filePath.split(/components|component/)[0], '').split('/').slice(1).join('/');
          this.fs.write(`${filePath}/view.jsx`, tpl.list(res.name, `'${viewPath}'`, reactType));
          this.fs.write(`${filePath}/action.js`, tpl.action());
          this.fs.write(`${filePath}/types.js`, tpl.types(viewPath, isTypeLoaderExist));
          this.fs.write(`${filePath}/saga.js`, tpl.saga());
          this.fs.write(`${filePath}/${reducerName}.js`, tpl.reducer(rrcLoaderType));
          this.fs.write(`${filePath}/me.json`, "{}");
        } else {
          this.log('该文件夹已经存在');
        }
      });
    })
  }

};