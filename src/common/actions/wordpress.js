import axios from '../../axios'
import { LOAD_POSTS, LOAD_PAGES, LOAD_COMMENTS, START, SUCCESS, FAIL } from '../constants'

export function loadPages() {
  return dispatch => {
    //dispatch({ type: LOAD_PAGES + START })
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