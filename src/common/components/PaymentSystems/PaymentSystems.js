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
        //from decorator
        page: PropTypes.object.isRequired,

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
		const {loading, paymentSystems, currencyFrom, currencyTo, history, page} = this.props

		if (!paymentSystems || loading) {
			return (
				<Loader />
			)
		} else {
			return (
				<div className="row">
			        <div className="col-xs-6">
			            <h4 className="mt0">{page.fields.home_send}</h4>
			            <Amount type="from" placeholder={page.fields.home_amount_to_send} />
			            <h5 className="choose-payment-system">{page.fields.home_choose_ps}</h5>
			            <div>
			            	<PaymentSystemsList list={paymentSystems} type="from" selected={currencyFrom} history={history} />
			        	</div>
			        </div>
			        <div className="col-xs-6">
			            <h4 className="mt0">{page.fields.home_receive}</h4>
			            <Amount type="to" placeholder={page.fields.home_amount_to_receive} />
			            <h5 className="choose-payment-system">{page.fields.home_choose_ps}</h5>
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