/**
 *  Movies Reducer
 */
import { createReducer, getLocalStorage } from 'utils';
import {
  FETCH_MOVIES,
  SET_PAGE_NUM,
  SET_TOTAL_PAGE_NUMBER
} from './../actions/movies_actions';

const InitialState = Object.assign({
  movies: [],
  pageNum: 1,
  totalPages: 0
}, getLocalStorage('movies'));

export const movies = createReducer(InitialState.movies, {
  [FETCH_MOVIES]: (state, action) => action
});

export const pageNum = createReducer(InitialState.pageNum, {
  [SET_PAGE_NUM]: (state, action) => action
});

export const totalPages = createReducer(InitialState.totalPages, {
  [SET_TOTAL_PAGE_NUMBER]: (state, action) => action
});

