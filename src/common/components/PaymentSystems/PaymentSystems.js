import React, { Component } from 'react';
import {connect} from 'react-redux'
import {loadAllPaymentSystems} from '../../actions/paymentSystems'
import PaymentSystemsList from './PaymentSystemsList'
import Loader from '../Shared/Loader'
import Amount from '../Amount/Amount'
import PropTypes from 'prop-types'
import {mapToArr} from "../../helpers"

class PaymentSystems extends Component {

	static propTypes = {
        //from connect
        paymentSystems: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        loadAllPaymentSystems: PropTypes.func.isRequired

	}

    componentDidMount() {
        const {loading, paymentSystems, loadAllPaymentSystems} = this.props
        if (!loading && paymentSystems.length === 0) loadAllPaymentSystems()
    }
    
	render() {

		return (
		    <div>
		    	{this.getBody()}
		    </div>
		);
	}

	getBody() {
		const {loading, paymentSystems, currencyFrom, currencyTo, history} = this.props

		if (!paymentSystems || loading) {
			return (
				<Loader />
			)
		} else {
			return (
				<div className="row">
			        <div className="col-md-6 col-sm-6">
			            <h4 className="mt0">Отправить</h4>
			            <Amount type="from" />
			            <h5 className="choose-payment-system">Choose Payment System</h5>
			            <div>
			            	<PaymentSystemsList list={paymentSystems} type="from" selected={currencyFrom} history={history} />
			        	</div>
			        </div>
			        <div className="col-md-6 col-sm-6">
			            <h4 className="mt0">Получить </h4>
			            <Amount type="to" />
			            <h5 className="choose-payment-system">Choose Payment System</h5>
			            <div>
			            	<PaymentSystemsList list={paymentSystems} type="to" selected={currencyTo} history={history} />
			        	</div>
			        </div>
			    </div>
		    )
		}
	}

}

export default connect((state) => {
    return {
        paymentSystems: mapToArr(state.paymentSystems.entities),
        loading: state.paymentSystems.loading,
        loaded: state.paymentSystems.loaded
    }
}, {loadAllPaymentSystems})(PaymentSystems)