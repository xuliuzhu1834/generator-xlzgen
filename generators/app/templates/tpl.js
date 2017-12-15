const list = (name, path) => (`
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ${name}List extends Component {
  constructor(props) {
      super(props);
      
  }
  render() {
    return (<div></div>)
  }
}

${name}List.propTypes = {
 
};
const mapStateToProps = state => state[${path}];
export default connect(mapStateToProps)(${name}List);
`);

const add = (name, path) => (`
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ${name}Add extends Component {
  constructor(props) {
      super(props);
      
  }
  render() {
    return (<div></div>)
  }
}

${name}Add.propTypes = {
 
};
const mapStateToProps = state => state[${path}];
export default connect(mapStateToProps)(${name}Add);
`);

const edit = (name, path) => (`
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ${name}edit extends Component {
  constructor(props) {
      super(props);
      
  }
  render() {
    return (<div></div>)
  }
}

${name}Add.propTypes = {
 
};
const mapStateToProps = state => state[${path}];
export default connect(mapStateToProps)(${name}edit);
`);

const reducer = () => (`
import assign from 'object-assign';
import * as types from './types';
export const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.commit:
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

export const commit = (key, value) => ({ type: types.commit, key, value });
`);

const saga = () => (`
import { message } from 'antd';
import { takeLatest, takeEvery } from 'redux-saga/effects';

function* saga() {

}
export default saga;
`);
const types = () => (`
export let commit;
`);
const style = () => ('');
const server = (path) => ('');
module.exports = {
  list,
  add,
  edit,
  action,
  saga,
  reducer,
  server,
  types,
};