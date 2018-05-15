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
        	wallet: data.Wallet,
        	deposit: data.Deposit,
        	txid: data.HRID,
        	amount: data.PlanAmount,
        	status: data.Status,
        	created: data.CreateDate,
        	fee: "2%",
        	rate: `1 ${data.CoinFrom.Symbol} = ${data.PlanRate} ${data.CoinTo.Symbol}`
        }

		
		var contentHtml = page.content.rendered ? page.content.rendered.format(replacers) : "";

		return (
			<div className="text-center">
				<h4 className="mt0 text-center">{page.title.rendered}</h4>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />

				<table className="tx-table">
					<tbody>
						<tr>
							<td className="tx-td-qr">
								<img src={qrcode_url} alt="QR code" />
							</td>
							<td className="tx-td-text">
								<div>
									{get(page, "fields.tx_address").format(replacers)} <b>{data.Deposit}</b>
								</div>
								<div>
									{get(page, "fields.tx_amount_from_request")} {data.PlanAmount} {data.CoinFrom.Symbol}
								</div>
								<br />
								<div>
									<button onClick = {this.handleClick} className="btn btn-primary">{get(page, "fields.tx_refresh_btn")} </button>	
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="tx-container" dangerouslySetInnerHTML={{ __html: get(page, "fields.tx_text_after_qr_code").format(replacers) }} />
				
			</div>
		);
	}

    handleClick = ev => {
    	this.props.getTransactionStatus(this.props.data.HRID)
    }
}

export default Form