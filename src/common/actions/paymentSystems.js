import axios from '../../axios'
import { LOAD_ALL_PAYMENT_SYSTEMS, START, SUCCESS, FAIL } from '../constants'

export function loadAllPaymentSystems() {
  return dispatch => {
    dispatch({ type: LOAD_ALL_PAYMENT_SYSTEMS + START })
    return axios.get(
        '/json_static/list.json'
    )
    .then(function (response) {
      const {Data, Errors} = response.data
        if (Errors.length === 0) {
            dispatch({
                type: LOAD_ALL_PAYMENT_SYSTEMS + SUCCESS,
                payload: Data
            })
        } else {
            dispatch({
                type: LOAD_ALL_PAYMENT_SYSTEMS + FAIL,
                errorMessage: Errors[0]
            })
        }
    })
    .catch(function (error) {
      dispatch({
        type: LOAD_ALL_PAYMENT_SYSTEMS + FAIL,
        errorMessage: error
      })
    });
  }
}