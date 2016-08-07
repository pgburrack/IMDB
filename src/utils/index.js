import moment from 'moment';
import jwt from 'jwt-simple';
import { jwtPrefix } from './constants';
import setInitialCoreLayout from './initialCore';

export function createConstants (...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}

/**
 * sort Array of Objects by key
 * @param  {[type]} Arr [description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
export function sortBy (Arr, key) {
  return Arr.sort(function (a, b) {
    return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  });
};

/**
 * set encrypt local storage key
 * @param {string} key   localStorage key
 * @param {object} value encrypt string object
 */
export function setLocalStorage (key, value) {
  localStorage.setItem(key, jwt.encode(value, jwtPrefix));
}

/**
 * get and decrypt local storage key
 * @param  {string} key localStorage key
 * @return {object}     decrypt object
 */
export function getLocalStorage (key) {
  if (!localStorage.getItem(key)) return undefined;
  return jwt.decode(localStorage.getItem(key), jwtPrefix);
}

/**
 * remove local storage key
 * @param  {string} key localStorage key
 */
export function removeLocalStorage (key) {
  return localStorage.removeItem(key);
}

/**
 * set user authentication session
 * @param {object} user user details object
 */
export function setUserSession (Obj) {
  var time = moment().add(2, 'hours').unix();
  setLocalStorage('token', { sessionTime: time, userDetails: Obj.user, addedMenu: Obj.menu });
  return time;
}
/**
 * menu tree object
 * @type {object}
 */
export const MenuTree = [
  {
    title: 'alarms',
    refName: 'alarms',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTAgMjBoNFY0aC00djE2em0tNiAwaDR2LThINHY4ek0xNiA5djExaDRWOWgtNHoiLz48L3N2Zz4=',
    url: '/app/alarms'
  },
  {
    title: 'campaigns',
    refName: 'campaigns',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNiA2bDIuMjkgMi4yOS00Ljg4IDQuODgtNC00TDIgMTYuNTkgMy40MSAxOGw2LTYgNCA0IDYuMy02LjI5TDIyIDEyVjZ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==',
    url: '/app/campaigns'
  },
  // {
  //   title: 'models',
  //   icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xOSAzaC00LjE4QzE0LjQgMS44NCAxMy4zIDEgMTIgMWMtMS4zIDAtMi40Ljg0LTIuODIgMkg1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bS03IDBjLjU1IDAgMSAuNDUgMSAxcy0uNDUgMS0xIDEtMS0uNDUtMS0xIC40NS0xIDEtMXptMiAxNEg3di0yaDd2MnptMy00SDd2LTJoMTB2MnptMC00SDdWN2gxMHYyeiIvPgo8L3N2Zz4=',
  //   refName: 'models',
  //   url: '/app/models'
  // },
  {
    title: 'Change Log',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMyAxM2g4VjNIM3YxMHptMCA4aDh2LTZIM3Y2em0xMCAwaDhWMTFoLTh2MTB6bTAtMTh2Nmg4VjNoLTh6Ii8+PC9zdmc+',
    refName: 'changeLog',
    url: '/app/changeLog'
  }
];

/**
 * set initial state of core layout
 * @return {object} updated initial state
 */
export function getInitialDetails () {
  const initialState = {
    MenuState: ''
  };

  var menuSelected = '/app/alarms'.split('/');

  initialState.MenuTree = arrangeMenuTree(menuSelected);
  initialState.navTitle = menuSelected.length > 1 ? { main: menuSelected[0], sub: menuSelected[1] } : { main: menuSelected[0] };

  return initialState;
}

export function arrangeMenuTree (menuSelected) {
  var renderMenu = [];
  MenuTree.forEach(function (tab, index) {
    var cloneTab = Object.assign({}, tab);

    if (tab.title === menuSelected[0]) {
      cloneTab.activeList = true;
      if (menuSelected.length > 1) {
        tab.childNodes.forEach(function (subTab, subIndex) {
          if (subTab.url.indexOf(menuSelected[1]) > -1) cloneTab.childNodes[subIndex].activeList = true;
        });
      }
    }
    renderMenu.push(cloneTab);
  });
  return renderMenu;
}

export function isFloat (n) { return n !== '' && !isNaN(n) && Math.round(n) !== n; };

export function isFunction (fn) { return typeof fn === 'function'; }

export function combineCssClasses () {
  return Array.prototype.slice.call(arguments).filter((argument) => argument).join(' ');
}

export function pushUniq (arr, value) {
  if (arr.indexOf(value) >= 0) return arr;
  return arr.concat(value);
}

function findPolyFill (arr, predicate) {
  if (arr === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }

  var list = Object(arr);
  var length = list.length >>> 0;
  var thisArg = arguments[2];
  var value;

  for (var i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return value;
    }
  }

  return undefined;
}

export function find (arr, predicate) {
  return typeof Array.prototype.find === 'undefined' ? findPolyFill(arr, predicate) : arr.find(predicate);
}

function findIndexPolyFill (arr, predicate) {
  if (arr === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }

  var list = Object(this);
  var length = list.length >>> 0;
  var thisArg = arguments[2];
  var value;

  for (var i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return i;
    }
  }
  return -1;
}

export function findIndex (arr, predicate) {
  return typeof Array.prototype.findIndex === 'undefined' ? findIndexPolyFill(arr, predicate) : arr.findIndex(predicate);
}

export function setInitialState (nextState, replace) {
  setInitialCoreLayout(nextState, replace, this.store);
}
