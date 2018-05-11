import React, { Component } from 'react';
import PropTypes from 'prop-types'
import QRCode from 'qrcode'
import { get } from "../../helpers"
const format = require('string-format').extend(String.prototype, {})

class Form extends Component {
	static propTypes = {
        //from props
        page: PropTypes.object.isRequired,
        data: PropTypes.shape({
	        Deposit: PropTypes.string.isRequired,
	        DepositType:  PropTypes.string.isRequired,  
	        CoinFrom:  PropTypes.object.isRequired,    
	        CoinTo:  PropTypes.object.isRequired,    
        }).isRequired,
	}

	render() {
		const {page, data } = this.props

		var qrcode_url = "";
		QRCode.toDataURL(data.Deposit, { errorCorrectionLevel: 'L', version: 8 }, function (err, url) {
		  	qrcode_url = url
		})
		
        var replacers = {
        	valute1: data.CoinFrom.Symbol, 
        	valute2: data.CoinTo.Symbol,
        	wallet: data.Deposit,
        	txid: data.ID,
        	amount: data.PlanAmount,
        	status: data.Status,
        	created: data.CreateDate,
        	fee: "2%",
        	rate: `1 ${data.CoinFrom.Symbol} = ${data.PlanRate} ${data.CoinTo.Symbol}`
        }

        debugger;
		
		var contentHtml = page.content.rendered ? page.content.rendered.format(replacers) : "";

		return (
			<div className="text-center">
				<h4 className="mt0 text-center">{page.title.rendered}</h4>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
				Please make deposit to {data.DepositType} address: {data.Deposit} 
				<br />
				<img src={qrcode_url} alt="QR code" />
			</div>
		);
	}
}

export default Form