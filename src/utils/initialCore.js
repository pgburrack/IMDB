/**
*  initial core layout
*/
import rootReducer, { registerNewReducers } from './../reducers';

export default function setInitialCoreLayout (nextState, replaceState, store) {
  const CoreReducer = require('./../reducers/coreLayout');
  const MoviesReducer = require('./../reducers/MoviesReducer');
  const { replaceReducer } = store;

  const {
    navTitle,
    menuTree,
    userDetails,
    menuState,
    getAppHost
  } = CoreReducer;

  const {
    pageNum,
    movies,
    totalPages
  } = MoviesReducer;

  const newReducersObj = {
    navTitle: navTitle,
    menuTree: menuTree,
    userDetails: userDetails,
    menuState: menuState,
    getAppHost: getAppHost,
    pageNum: pageNum,
    movies: movies,
    totalPages: totalPages
  };

  registerNewReducers(newReducersObj);
  replaceReducer(rootReducer());
}
