import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {setAmountCrypto} from '../../actions/exchangeInfo'

class Amount extends Component {

	static propTypes = {
        //from connect
        paymentSystemsMap: PropTypes.object.isRequired,
        exchangeInfo: PropTypes.shape({
	        selected_from: PropTypes.string,
	        selected_to: PropTypes.string,
	        amount_from: PropTypes.string,
	        amount_to: PropTypes.string,
	        loaded_pair: PropTypes.bool.isRequired,
	        loading_pair: PropTypes.bool.isRequired,
	        rate: PropTypes.object.isRequired
        }).isRequired,
        // from attrs
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired
	}

    state = {
        amount: ''
    }

    componentWillMount() {
    	const {exchangeInfo, type} = this.props
    	const amount = exchangeInfo["amount_" + type];

	    if (amount && amount.length > 0) this.setState({
	      amount: exchangeInfo["amount_" + type] || ''
	    })
    }

    componentWillReceiveProps(nextProps) {
		const {exchangeInfo, type} = nextProps

		const antiType = type === "from" ? "to" : "from"

	    this.setState({
	      amount: nextProps.exchangeInfo["amount_" + type] || ''
	    })

	    //if (exchangeInfo.calculatingType) debugger;
	    
		if (
			exchangeInfo.calculatingType &&
			(type === "to" || exchangeInfo["amount_" + antiType] !== this.props.exchangeInfo["amount_" + antiType])
		) {
			if (exchangeInfo.rate.rate === 0) {
				this.props.setAmountCrypto("0", this.props.type)
			} else if (exchangeInfo.rate.rate) {
				if (type === "to") {
					var value = exchangeInfo["amount_" + antiType] * exchangeInfo.rate.rate
				} else {
					value = exchangeInfo["amount_" + antiType] / exchangeInfo.rate.rate
				}
				this.props.setAmountCrypto(value + "", this.props.type)
			}
		}
    }

    shouldComponentUpdate(nextProps, nextState) {
    	const {exchangeInfo: {amount_from, amount_to, rate}} = nextProps

        return (
        	amount_from !== this.props.exchangeInfo.amount_from ||
        	amount_to !== this.props.exchangeInfo.amount_to ||
        	(rate && rate.rate !== this.props.exchangeInfo.rate.rate )
    	)
    }

	render() {
		const {exchangeInfo: {selected_from, selected_to}, paymentSystemsMap, type, placeholder} = this.props
		var selected_id = type === "from" ? selected_from : selected_to
		if (selected_id) {
			var paymentSystem = paymentSystemsMap[selected_id]
			var pic = paymentSystem.imageSmall.match(/([^/]+)(?=\.\w+$)/)[0]
		}
		return (
			<div>
	            <div className="amount-container">
	            	<input type="text" value = {this.state.amount} onChange = {this.handleChange} name="amount" placeholder={placeholder} className="amount-input" />
	            	<button className="btn btn-default amount-btn" type="button"> 
	            		<span className={"coin_" + pic}></span>
	            	</button>
	            </div>
			</div>
		);
	}

    handleChange = ev => {
	    const target = ev.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    this.props.setAmountCrypto(value, this.props.type, true)
    }
}

export default connect((state) => {
	return {
        paymentSystemsMap: state.paymentSystems.entities,
		exchangeInfo: state.exchangeInfo
	}
}, { setAmountCrypto })(Amount)
