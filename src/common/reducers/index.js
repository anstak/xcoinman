import {combineReducers} from "redux"
//import auth from './auth'
import paymentSystems from './paymentSystems'
import exchangeInfo from './exchangeInfo'
import transaction from './transaction'

export default combineReducers({
	//system: auth,
	paymentSystems,
	exchangeInfo,
	transaction
})