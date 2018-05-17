import axios from '../../axios'
import { REDIRECT_TO_TRANSACTION_FINISHED, GET_TRANSACTION_STATUS, START, SUCCESS, FAIL } from '../constants'
import querystring from 'querystring';


export function redirectToTransactionFinished(transactionData) {
    return { 
        type: REDIRECT_TO_TRANSACTION_FINISHED,
        payload: transactionData
    }
}

export function getTransactionStatus(id) {
  return dispatch => {
    dispatch({ type: GET_TRANSACTION_STATUS + START })
    const params = querystring.stringify({HRID: id, hardCheck: false});
    return axios.post(
        '/api/CryptoCurrencies/shapeshift-status',
        params
    )
    .then(function (response) {
      const {Data, Errors} = response.data
        if (Errors.length === 0) {
            dispatch({
                type: GET_TRANSACTION_STATUS + SUCCESS,
                payload: Data
            })
        } else {
            dispatch({
                type: GET_TRANSACTION_STATUS + FAIL,
                errorMessage: Errors[0]
            })
        }
    })
    .catch(function (error) {
      dispatch({
        type: GET_TRANSACTION_STATUS + FAIL,
        errorMessage: error
      })
    });
  }
}