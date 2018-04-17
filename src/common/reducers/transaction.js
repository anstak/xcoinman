import {REDIRECT_TO_TRANSACTION_FINISHED, GET_TRANSACTION_STATUS, START, FAIL, SUCCESS} from "../constants"

const initialState = {
  loaded_transaction: false,
  loading_transaction: false,
  transactionError: null,
  transactionData: {}
}

export default function(state = initialState, action = {}) {
  const {errorMessage, payload} = action
  switch (action.type) {
    case REDIRECT_TO_TRANSACTION_FINISHED:
      return {
        ...state,
        loaded_transaction: true,
        loading_transaction: false,
        transactionData: payload
      }
    case GET_TRANSACTION_STATUS + START:
      return {
        ...state,
        loading_transaction: true,
        transactionError: null
      }
    case GET_TRANSACTION_STATUS + FAIL:
      return {
        ...state,
        loading_transaction: false,
        transactionError: errorMessage
      }
    case GET_TRANSACTION_STATUS + SUCCESS:
      return {
        ...state,
        loaded_transaction: true,
        loading_transaction: false,
        transactionData: payload
      }
    default:
      return state
  }
}