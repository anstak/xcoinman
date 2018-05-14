import React, { Component } from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {toggleActiveCrypto, setAmountCrypto} from '../../actions/exchangeInfo'

class PaymentSystemsList extends Component {
	static propTypes = {
        //from connect
        selected_from: PropTypes.string,
        selected_to: PropTypes.string,
        toggleActiveCrypto: PropTypes.func.isRequired,
        loadedPaymentSystems: PropTypes.bool.isRequired,
        // from attrs
        type: PropTypes.string.isRequired,
        list: PropTypes.array.isRequired,
        selected: PropTypes.string
	}

    state = {
        intervalId: 0
    };	

    componentDidMount() {
        const {selected, type, loadedPaymentSystems} = this.props
		if (selected && loadedPaymentSystems) {
			this.props.toggleActiveCrypto(selected, type)
		}
    }

    shouldComponentUpdate(nextProps, nextState) {
    	const {loadedPaymentSystems, selected_from, selected_to} = nextProps

        return (selected_from !== this.props.selected_from ||
        	selected_to !== this.props.selected_to ||
        	loadedPaymentSystems !== this.props.loadedPaymentSystems
    	)
    }

    componentWillReceiveProps(nextProps) {
        const {selected, type, loadedPaymentSystems} = nextProps

		if (this.props.selected !== nextProps.selected && loadedPaymentSystems) {
			this.props.toggleActiveCrypto(selected, type)
		}
    }


	render() {
		const {list, type} = this.props

		const paymentSystems = list.map(paymentSystem => {
			const picname = paymentSystem.imageSmall.match(/([^/]+)(?=\.\w+$)/)[0]
			return (
	        	<button className={this.getClassName(paymentSystem.Symbol)} disabled={this.getDisabled(paymentSystem.Symbol)} type="button" key={paymentSystem.Symbol} onClick={this.toggleClick(paymentSystem.Symbol, type)}>
	        		<span className={"coin_icon coin_" + picname} />
	        		{paymentSystem.Name}
	        	</button>
			)
		})

		return (
			<div>
            	{paymentSystems}
			</div>
		);
	}

	  scrollStep() {
	    if (window.pageYOffset === 0) {
	        clearInterval(this.state.intervalId);
	    }
	    window.scroll(0, window.pageYOffset - 40);
	  }
	  
	  scrollToTop() {
	    let intervalId = setInterval(this.scrollStep.bind(this), 10);
	    this.setState({ intervalId: intervalId });
	  }

	toggleClick = (symbol, type) => ev =>  {
		var selected = {
			from: this.props.selected_from,
			to: this.props.selected_to,
		}
		selected[type] = symbol
		if (selected.from && selected.to) {
			this.props.history.push(selected.from.toLowerCase() + "-to-" + selected.to.toLowerCase())
			this.scrollToTop()
		} else {
			this.props.toggleActiveCrypto(symbol, type)
		}
	}

	getClassName(paymentSystemID) {
		const {type} = this.props
		var classes = ["btn", "btn-link", "border-pretty"]
		if (paymentSystemID === this.props["selected_" + type]) classes.push("btn-active")
		return classes.join(" ")
	}

	getDisabled(paymentSystemID) {
		const {type} = this.props
		var anti_type = type === "from" ? "to" : "from"
		return paymentSystemID === this.props["selected_" + anti_type]
	}
}


export default connect((state) => {
	return {
		selected_from: state.exchangeInfo.selected_from,
		selected_to: state.exchangeInfo.selected_to,
        loadedPaymentSystems: state.paymentSystems.loaded
	}
}, { toggleActiveCrypto, setAmountCrypto })(PaymentSystemsList)