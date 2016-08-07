import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import * as AuthReducer from './AuthReducer';

const {
  fetchUserAuth,
  userLogged,
  userLogout,
  addedMenu
} = AuthReducer;

let asyncReducers = {};

export function registerNewReducers (newReducerObj) {
  asyncReducers = Object.assign(asyncReducers, newReducerObj);
}

export default function rootReducer () {
  const initialReducers = {
    fetchUserAuth: fetchUserAuth,
    userLogged: userLogged,
    userLogout: userLogout,
    addedMenu: addedMenu,
    routing: router
  };
  var reducersObj = Object.assign(initialReducers, asyncReducers);
  return combineReducers(reducersObj);
}
