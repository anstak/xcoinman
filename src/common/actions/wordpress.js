import axios from '../../axios'
import { LOAD_POSTS, LOAD_PAGES, LOAD_COMMENTS, START, SUCCESS, FAIL } from '../constants'

export function loadPages() {
  return dispatch => {
    dispatch({ type: LOAD_PAGES + START })
    return axios.get(
        '/json_static/pages.json'
    )
    .then(function (response) {
        dispatch({
            type: LOAD_PAGES + SUCCESS,
            payload: response.data
        })
    })
    .catch(function (error) {
      dispatch({
        type: LOAD_PAGES + FAIL,
        errorMessage: "Can't get pages"
      })
    });
  }
}

export function loadComments() {
  return dispatch => {
    dispatch({ type: LOAD_COMMENTS + START })
    return axios.get(
        '/json_static/comments.json'
    )
    .then(function (response) {
        dispatch({
            type: LOAD_COMMENTS + SUCCESS,
            payload: response.data
        })
    })
    .catch(function (error) {
      dispatch({
        type: LOAD_COMMENTS + FAIL,
        errorMessage: "Can't get comments"
      })
    });
  }
}

export function loadPosts() {
  return dispatch => {
    dispatch({ type: LOAD_POSTS + START })
    return axios.get(
        '/json_static/posts.json'
    )
    .then(function (response) {
        dispatch({
            type: LOAD_POSTS + SUCCESS,
            payload: response.data
        })
    })
    .catch(function (error) {
      dispatch({
        type: LOAD_POSTS + FAIL,
        errorMessage: "Can't get posts"
      })
    });
  }
}