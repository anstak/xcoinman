import {LOAD_POSTS, LOAD_PAGES, LOAD_COMMENTS, START, FAIL, SUCCESS} from "../constants"
import {arrToMap} from "../helpers"

const initialState = {
    loading_pages: false,
    loaded_pages: false,
    pages: {},
    posts: {},
    comments: {}
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
    default:
      return state
  }
}