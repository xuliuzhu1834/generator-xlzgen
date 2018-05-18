const { exec } = require('shelljs');
const fs = require('fs');
const path = require('path');
const compareVersions = require('compare-versions');

const versions = {
  reactVersion: '',
  rrcLoaderVersion: '',
  typeLoaderVersion: '',
  reducerName: '',
  err: [],
};


const prefix = exec('npm prefix', { silent: true }).stdout.split('\n')[0];

const packagePath = path.resolve(prefix, 'package-lock.json');
const webpackPath =  path.resolve(prefix, 'webpack.config.js');
const packageBasePath = path.resolve(prefix, 'webpack.base.config.js');


if (fs.existsSync(packagePath)) {
  const {dependencies} = require(packagePath);
  if (dependencies) {
    versions.reactVersion = dependencies.react && dependencies.react.version || '0.0.0';
    versions.rrcLoaderVersion = dependencies['rrc-loader-helper'] && dependencies['rrc-loader-helper'].version || '0.0.0';
    versions.typeLoaderVersion = dependencies['react-redux-types-loader'] && dependencies['react-redux-types-loader'].version;
  }
} else {
  versions.err.push('未找到package-lock.json');
}
if (fs.existsSync(webpackPath) || fs.existsSync(packageBasePath)) {
  const isWebpackExist = fs.existsSync(path.resolve(prefix, 'webpack.config.js'));
  const webpackObj = isWebpackExist ? require(webpackPath) : require(packageBasePath);
  if (webpackObj) {
    const rules = webpackObj.module.rules;
    rules.forEach((v) => {
      const loaders = v.loaders;
      if (loaders) {
        const obj = loaders.find(d => d.options && d.options.reducerName);
        if (obj) {
          versions.reducerName = obj.options.reducerName;
        }
      }
    });
  }

} else {
  versions.err.push('未找到webpack.config.js 或者 webpack.base.config.js 文件');
}

const result = {
  reactType: compareVersions(versions.reactVersion, '16.0.0') > -1,
  rrcLoaderType: compareVersions(versions.rrcLoaderVersion, '1.2.5') > -1,
  isTypeLoaderExist: !!versions.typeLoaderVersion,
  reducerName: versions.reducerName || 'reducer',
  errors: versions.err,
};
module.exports = result;
