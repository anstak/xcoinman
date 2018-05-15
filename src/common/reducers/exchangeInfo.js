import {TOGGLE_ACTIVE_CRYPTO, SET_AMOUNT_CRYPTO, LOAD_CRYPTO_PAIR, CREATE_TRANSACTION, REDIRECT_TO_TRANSACTION_FINISHED, START, FAIL, SUCCESS} from "../constants"

const initialState = {
    amount_from: null,
    amount_to: null,
    selected_from: null,
    selected_to: null,
    loading_pair: false,
    loaded_pair: false,
    calculatingType: null,
    loaded_transaction: false,
    loading_transaction: false,
    transactionError: null,
    transactionData: {},
    rate: {}
}

export default function(state = initialState, action = {}) {
  const {errorMessage, payload} = action
  switch (action.type) {
    case TOGGLE_ACTIVE_CRYPTO:
      return {
        ...state, 
        ['selected_' + payload.type ]: payload.symbol,
        transactionError: null
      }
    case SET_AMOUNT_CRYPTO:
      return {
        ...state, 
        ['amount_' + payload.type ]: payload.amount,
        calculatingType: (payload.calculating ? payload.type : null)
      }
    case LOAD_CRYPTO_PAIR + START:
      return {
        ...state,
        loading_pair: true,
        calculatingType: null
      }
    case LOAD_CRYPTO_PAIR + FAIL:
      return {
        ...state,
        rate: {},
        amount_from: null,
        amount_to: null,
        calculatingType: null,
        errorMessage
      }
    case LOAD_CRYPTO_PAIR + SUCCESS:
      return {
        ...state,
        loaded_pair: true,
        loading_pair: false,
        amount_from: "1",
        calculatingType: "from",
        rate: payload
      }
    case CREATE_TRANSACTION + START:
      return {
       	...state,
        loading_transaction: true,
        transactionError: null
      }
    case CREATE_TRANSACTION + FAIL:
      return {
       	...state,
        loading_transaction: false,
        transactionError: errorMessage
      }
    case CREATE_TRANSACTION + SUCCESS:
      return {
        ...state,
        loaded_transaction: true,
        loading_transaction: false,
        transactionData: payload
      }
    case REDIRECT_TO_TRANSACTION_FINISHED:
      return {
        ...state,
        loaded_transaction: false,
        loading_transaction: false,
        transactionData: {}
      }
    default:
      return state
  }
}