import axios from '../../axios'
import { LOAD_POSTS, LOAD_PAGES, LOAD_COMMENTS, LOAD_NEWS, START, SUCCESS, FAIL } from '../constants'

function getLanguageFromHost(request_host) {
  const host = typeof window === 'undefined' ? request_host : window.location.host;
  var lang = "ru"
  if (host.split(".")[1] === "com") {
    lang = "en"
  }
  return lang;
}

export function loadPages(request_host) {
  var lang = getLanguageFromHost(request_host)
  return dispatch => {
    dispatch({ type: LOAD_PAGES + START })
    return axios.get(
        `/json_static/${lang}-pages.json`
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

export function loadComments(request_host) {
  var lang = getLanguageFromHost(request_host)
  return dispatch => {
    dispatch({ type: LOAD_COMMENTS + START })
    return axios.get(
        `/json_static/${lang}-comments.json`
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

export function loadPosts(request_host) {
  var lang = getLanguageFromHost(request_host)
  return dispatch => {
    dispatch({ type: LOAD_POSTS + START })
    return axios.get(
        `/json_static/${lang}-posts.json`
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

export function loadNews(request_host) {
  var lang = getLanguageFromHost(request_host)
  return dispatch => {
    dispatch({ type: LOAD_NEWS + START })
    return axios.get(
        `/json_static/${lang}-news.json`
    )
    .then(function (response) {
        dispatch({
            type: LOAD_NEWS + SUCCESS,
            payload: response.data
        })
    })
    .catch(function (error) {
      dispatch({
        type: LOAD_NEWS + FAIL,
        errorMessage: "Can't get news"
      })
    });
  }
}