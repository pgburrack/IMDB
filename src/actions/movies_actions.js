/**
 *  movies actions
 */
'use strict';

import { APIgetCall } from './../utils/api';
import { setLocalStorage } from './../utils';
import { IMDB_MOVIES_URL } from './../utils/constants';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const SET_PAGE_NUM = 'SET_PAGE_NUM';
export const SET_TOTAL_PAGE_NUMBER = 'SET_TOTAL_PAGE_NUMBER';

export const moviesActionsCreators = {
  fetchMovies: (pageNum) => (dispatch) => {
    fetch(APIgetCall(`${IMDB_MOVIES_URL}&page=${pageNum}`))
      .then((res) => (res.status === 302 || res.status === 405) ? res.status : res.json())
      .then((res) => {
        dispatch({
          type: FETCH_MOVIES,
          payload: res.results
        });
        dispatch({
          type: SET_TOTAL_PAGE_NUMBER,
          payload: res.total_pages
        });
        console.log(1);
        setLocalStorage('movies', { movies: res.results, pageNum: pageNum, totalPages: res.total_pages });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setPageNum: (value) => ({ type: SET_PAGE_NUM, payload: value })
};
