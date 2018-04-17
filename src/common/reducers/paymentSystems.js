import {LOAD_ALL_PAYMENT_SYSTEMS, START, FAIL, SUCCESS} from "../constants"
import {arrToMap} from "../helpers"

const initialState = {
    loading: false,
    loaded: false,
    entities: {}
}

export default function(state = initialState, action = {}) {
  const {errorMessage, payload} = action

  switch (action.type) {
    case LOAD_ALL_PAYMENT_SYSTEMS + START:
      return {
       	...state,
        loading: true
      }
    case LOAD_ALL_PAYMENT_SYSTEMS + FAIL:
      return {
       	...state,
        errorMessage
      }
    case LOAD_ALL_PAYMENT_SYSTEMS + SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: arrToMap(payload, "Symbol")
      }
    default:
      return state
  }
}