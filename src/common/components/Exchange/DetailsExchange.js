import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {loadCryptoPair} from '../../actions/exchangeInfo'
import FormExchange from './FormExchange'
import ImagesDirection from './ImagesDirection'
import _ from 'lodash'

class DetailsExchange extends Component {

	static propTypes = {
        //from connect
        exchangeInfo: PropTypes.shape({
	        selected_from: PropTypes.string,
	        selected_to: PropTypes.string,
	        amount_from: PropTypes.string,
	        amount_to: PropTypes.string,
	        loaded_pair: PropTypes.bool.isRequired,
	        loading_pair: PropTypes.bool.isRequired,
	        rate: PropTypes.object.isRequired,
            loaded_transaction: PropTypes.bool.isRequired,
            loading_transaction: PropTypes.bool.isRequired,
            transactionError: PropTypes.string,
            transactionData: PropTypes.object,            
        }).isRequired,

        //from route
        currencyFrom: PropTypes.string,
        currencyTo: PropTypes.string
	}


    componentWillReceiveProps(nextProps) {
		const {exchangeInfo: {selected_from, selected_to, loaded_pair, loading_pair}, paymentSystemsMap, loadCryptoPair} = nextProps

		if (loading_pair) return false

       	if (selected_from === this.props.exchangeInfo.selected_from &&
        	selected_to === this.props.exchangeInfo.selected_to) return false

        if (selected_from && selected_to) {
			var cryptoFrom = paymentSystemsMap[selected_from]
			var cryptoTo = paymentSystemsMap[selected_to]
        	loadCryptoPair(cryptoFrom.Symbol + "_" + cryptoTo.Symbol)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {exchangeInfo, paymentSystemsMap} = nextProps

        return (
            !_.isEqual(exchangeInfo, this.props.exchangeInfo)
    	)
    }

	render() {
		return (
			<div>
				{this.getBody()}
			</div>
		);
	}

	getBody() {
		const {exchangeInfo: {selected_from, selected_to, amount_from, amount_to, rate}, paymentSystemsMap, currencyFrom, currencyTo} = this.props
        if (currencyFrom && currencyTo) {
            var cryptoFrom = paymentSystemsMap[currencyFrom.toUpperCase()]
            var cryptoTo = paymentSystemsMap[currencyTo.toUpperCase()]
            if (!cryptoFrom || !cryptoTo) return null
        } else {
            var cryptoFrom = paymentSystemsMap[selected_from]
            var cryptoTo = paymentSystemsMap[selected_to]
        }


		if (!cryptoFrom) {
			return (
				<div>
					Need to select From currency
				</div>
			)
		}

		if (!cryptoTo) {
			return (
				<div>
					Need to select To currency
				</div>
			)
		}

		return (
			<div>
                <ImagesDirection cryptoTo={cryptoTo} cryptoFrom={cryptoFrom} />
                <FormExchange cryptoTo={cryptoTo} cryptoFrom={cryptoFrom} exchangeInfo={this.props.exchangeInfo} />
                <br />
                <p>Attention! In regard with the instability of Bitcoin's exchange rate, the amount you receive will be recalculated at the new exchange rate, if more than 10 minutes have passed from the inception of your order to the receipt of funds
                        on our account. Making the order confirms acceptance of this condition and User agreement. </p>

                <pre style={{wordWrap: "break-word", whiteSpace: "normal"}}>
                    {JSON.stringify(this.props.exchangeInfo)}
                </pre>		
			</div>
		)
	}
}

export default connect((state) => {
	return {
        paymentSystemsMap: state.paymentSystems.entities,
		exchangeInfo: state.exchangeInfo
	}
}, { loadCryptoPair })(DetailsExchange)