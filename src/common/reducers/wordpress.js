import {LOAD_POSTS, LOAD_PAGES, LOAD_COMMENTS, START, FAIL, SUCCESS} from "../constants"
import {arrToMap} from "../helpers"

const initialState = {
    loading_pages: false,
    loaded_pages: false,
    loading_posts: false,
    loaded_posts: false,
    loading_comments: false,
    loaded_comments: false,
    pages: {},
    posts: {},
    comments: []
}

export default function(state = initialState, action = {}) {
  const {errorMessage, payload} = action

  switch (action.type) {
    case LOAD_PAGES + START:
      return {
       	...state,
        loading_pages: true
      }
    case LOAD_PAGES + FAIL:
      return {
       	...state,
        errorMessage
      }
    case LOAD_PAGES + SUCCESS:
      return {
        ...state,
        loaded_pages: true,
        loading_pages: false,
        pages: arrToMap(payload, "slug")
      }
    case LOAD_POSTS + START:
      return {
        ...state,
        loading_posts: true
      }
    case LOAD_POSTS + FAIL:
      return {
        ...state,
        errorMessage
      }
    case LOAD_POSTS + SUCCESS:
      return {
        ...state,
        loaded_posts: true,
        loading_posts: false,
        posts: arrToMap(payload, "slug")
      }
    case LOAD_COMMENTS + START:
      return {
        ...state,
        loading_comments: true
      }
    case LOAD_COMMENTS + FAIL:
      return {
        ...state,
        errorMessage
      }
    case LOAD_COMMENTS + SUCCESS:
      return {
        ...state,
        loaded_comments: true,
        loading_comments: false,
        comments: payload
      }
    default:
      return state
  }
}