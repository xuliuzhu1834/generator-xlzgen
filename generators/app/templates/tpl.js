const list = (name, path, type) => (`
import React, { Component, ${!type ? 'PropTypes' : ''}} from 'react';
${type ? 'import PropTypes from \'prop-types\';' : ''}
import { connect } from 'react-redux';

class ${name} extends Component {
  constructor(props) {
      super(props); 
  }
  render() {
    return (<div />)
  }
}

${name}.propTypes = {
 
};
const mapStateToProps = state => state[${path}];
export default connect(mapStateToProps)(${name});
`);

const reducer = (type) => (
  type ? `
import * as types from './types';
export const defaultState = {};

const reducer = {
  defaultState,
  [types.changeValue]: (state, ({ key, value })) => { state[key] = value },
}
export default reducer;
`
    :
    `
import assign from 'object-assign';
import * as types from './types';
export const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
}
export default reducer;
`);

const action = () => (`
import * as types from './types';

export const changeValue = (key, value) => ({ type: types.changeValue, key, value });
`);

const saga = () => (`
import { message } from 'antd';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as types from './types';
import { } from './action';

function* saga() {

}
export default saga;
`);
const types = (path, type) => (
  type ?
    `export let changeValue`
    :
    `const prefix = '${path.replace(/\//g, '_')}_';
export const changeValue = \`\${prefix}changeValue\`;`
);
const style = () => ('');
module.exports = {
  list,
  action,
  saga,
  reducer,
  types,
};