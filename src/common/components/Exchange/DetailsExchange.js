import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {loadCryptoPair, clearRates} from '../../actions/exchangeInfo'
import FormExchange from './FormExchange'
import ImagesDirection from './ImagesDirection'
import {Helmet} from "react-helmet";
import _ from 'lodash'
const format = require('string-format').extend(String.prototype, {})

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


    componentWillMount() {
    	const {exchangeInfo: {selected_from, selected_to}, paymentSystemsMap, loadCryptoPair} = this.props
        if (selected_from && selected_to) {
			var cryptoFrom = paymentSystemsMap[selected_from]
			var cryptoTo = paymentSystemsMap[selected_to]
        	loadCryptoPair(cryptoFrom.Symbol + "_" + cryptoTo.Symbol)
        }
    }

    componentWillReceiveProps(nextProps) {
		const {exchangeInfo: {selected_from, selected_to, loading_pair}, paymentSystemsMap, loadCryptoPair} = nextProps

		if (loading_pair) return false

       	if (selected_from === this.props.exchangeInfo.selected_from &&
        	selected_to === this.props.exchangeInfo.selected_to) return false
        if (selected_from && selected_to) {
			var cryptoFrom = paymentSystemsMap[selected_from]
			var cryptoTo = paymentSystemsMap[selected_to]
        	loadCryptoPair(cryptoFrom.Symbol + "_" + cryptoTo.Symbol)
        }

        if (!selected_from && !selected_to) {
			this.props.clearRates()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {exchangeInfo} = nextProps
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
		const {exchangeInfo: {selected_from, selected_to}, paymentSystemsMap, currencyFrom, currencyTo, loaded_pages, pages} = this.props

        var cryptoFrom = paymentSystemsMap[selected_from]
        var cryptoTo = paymentSystemsMap[selected_to]

        if (currencyFrom && currencyTo) {
            cryptoFrom = paymentSystemsMap[currencyFrom.toUpperCase()]
            cryptoTo = paymentSystemsMap[currencyTo.toUpperCase()]
            if (!cryptoFrom || !cryptoTo) return null
        }


        var page = pages["home"] || {fields: {}, content: {}, title: {}}

		if (!cryptoFrom || !cryptoTo) {
			return (
				<div>
					<h4 className="mt0 text-center"> { page.title.rendered } </h4>
					<div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
				</div>
			)
		}

    	var valuteReplacers = {valute1: cryptoFrom.Symbol, valute2: cryptoTo.Symbol}
		page = pages["valute1-to-valute2"] || {fields: {}, content: {}, title: {}}
		var helmet = (
            <Helmet>
                <title>{page.fields.seo_title ? page.fields.seo_title.format(valuteReplacers) : ""}</title>
                <meta name="description" content={page.fields.seo_description ? page.fields.seo_description.format(valuteReplacers) : ""} />
            </Helmet>    				
		)

		return (
			<div>
				{helmet}
				<h4 className="mt0 text-center">{page.title.rendered ? page.title.rendered.format(valuteReplacers) : ""} </h4>
                <FormExchange cryptoTo={cryptoTo} cryptoFrom={cryptoFrom} exchangeInfo={this.props.exchangeInfo} page={page} />
                <br />
                <div dangerouslySetInnerHTML={{ __html: page.content.rendered ? page.content.rendered.format(valuteReplacers) : "" }} />
	
			</div>
		)
	}
}

export default connect((state) => {
	return {
        paymentSystemsMap: state.paymentSystems.entities,
		exchangeInfo: state.exchangeInfo,
        pages: state.wordpress.pages,
        loaded_pages: state.wordpress.loaded_pages		
	}
}, { loadCryptoPair, clearRates })(DetailsExchange)