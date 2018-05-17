const list = (name, path) => (`
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const reducer = () => (`
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

export const chnageValue = (key, value) => ({ type: types.changeValue, key, value });
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
const types = () => (`export let changeValue;`);
const style = () => ('');
module.exports = {
  list,
  action,
  saga,
  reducer,
  types,
};