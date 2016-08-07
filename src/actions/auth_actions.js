/**
 *  auth actions
 */
import jwt from 'jwt-simple';
import { jwtPrefix } from './../utils/constants';
import { APIpostCall } from './../utils/api';
import { setUserSession, removeLocalStorage } from './../utils';

export const AUTH_USER_DETAILS = 'AUTH_USER_DETAILS';
export const AUTH_USER_LOG_STATUS = 'AUTH_USER_LOG_STATUS';
export const AUTH_USER_LOGOUT = 'AUTH_USER_LOGOUT';
export const ADDED_MENU = 'ADDED_MENU';

export const authActionsCreators = {
  authenticatUser: (value) => ({ type: AUTH_USER_LOG_STATUS, payload: value }),
  fetchUserAuth: (postParams, user_status) => (dispatch) => {
    if (!user_status) {
      var user = {
        userId: 0,
        userName: '',
        userEmail: '',
        userToken: 0
      };
      return dispatch({
        type: AUTH_USER_DETAILS,
        payload: user
      });
    } else {
      fetch(APIpostCall('/api/login', postParams))
      .then((res) => {
        if (res.status === 302 || res.status === 500) return res.status;
        if (res.status === 401) {
          removeLocalStorage('token');
        };
        return res.json();
      })
      .then((res) => {
        if (typeof assignedUser === 'number') return res;

        let assignedUser = Object.assign({}, res, { user: jwt.decode(res.user, jwtPrefix), menu: jwt.decode(res.menu, jwtPrefix) });

        assignedUser.user.userToken = setUserSession(assignedUser);
        if (assignedUser.menu.length) {
          dispatch({
            type: ADDED_MENU,
            payload: assignedUser.menu
          });
        }
        return dispatch({
          type: AUTH_USER_DETAILS,
          payload: assignedUser.user
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};
