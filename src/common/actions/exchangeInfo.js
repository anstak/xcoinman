import axios from '../../axios'
import { TOGGLE_ACTIVE_CRYPTO, SET_AMOUNT_CRYPTO, LOAD_CRYPTO_PAIR, CREATE_TRANSACTION, START, SUCCESS, FAIL } from '../constants'
import querystring from 'querystring';

export function toggleActiveCrypto(symbol, type) {
    return {
        type: TOGGLE_ACTIVE_CRYPTO,
        payload: { symbol: (symbol ? symbol.toUpperCase() : null), type }
    }
}

export function setAmountCrypto(amount, type, calculating) {
    return {
        type: SET_AMOUNT_CRYPTO,
        payload: { amount, type, calculating }
    }
}

export function loadCryptoPair(ratePair) {
  return dispatch => {
    dispatch({ type: LOAD_CRYPTO_PAIR + START })

    return axios.post(
        '/api/CryptoCurrencies/rate',
        querystring.stringify({ratePair})
    )
    .then(function (response) {
      const {Data, Errors, Info, Type} = response.data
        if (Errors.length === 0) {
            dispatch({
                type: LOAD_CRYPTO_PAIR + SUCCESS,
                payload: Data
            })
        } else {
            dispatch({
                type: LOAD_CRYPTO_PAIR + FAIL,
                errorMessage: Errors[0]
            })
        }
    })
    .catch(function (error) {
      dispatch({
        type: LOAD_CRYPTO_PAIR + FAIL,
        errorMessage: error
      })
    });
  }
}

export function createTransaction(transaction) {
  return dispatch => {
    dispatch({ type: CREATE_TRANSACTION + START })

    return axios.post(
        '/api/CryptoCurrencies/transaction-create',
        querystring.stringify(transaction)
    )
    .then(function (response) {
      const {Data, Errors, Info, Type} = response.data
        if (Errors.length === 0) {
            dispatch({
                type: CREATE_TRANSACTION + SUCCESS,
                payload: Data
            })
        } else {
            dispatch({
                type: CREATE_TRANSACTION + FAIL,
                errorMessage: Errors[0]
            })
        }
    })
    .catch(function (error) {
      dispatch({
        type: CREATE_TRANSACTION + FAIL,
        errorMessage: error
      })
    });
  }
}
