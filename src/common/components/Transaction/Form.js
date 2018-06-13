import React, { Component } from 'react';
import PropTypes from 'prop-types'
import QRCode from 'qrcode'
import { get, TXStatusEnum } from "../../helpers"
//import {Helmet} from "react-helmet";
import Moment from 'react-moment';
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
		const { data } = this.props

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
        	rate: `1 ${data.CoinFrom.Symbol} = ${data.PlanRate} ${data.CoinTo.Symbol}`,
        	amountTo: data.PlanAmount*data.PlanRate
        }
		
		if (data.Status <= 2) {
			return this.getInitialTransaction(replacers);
		} else {
			return this.getProcessTransaction(replacers);
		}
	}

	getInitialTransaction(replacers = {}) {
		const {page, data } = this.props

		var qrcode_url = "";
		QRCode.toDataURL(data.Deposit, { errorCorrectionLevel: 'L', version: 8 }, function (err, url) {
		  	qrcode_url = url
		})
		
		var contentHtml = page.content.rendered ? page.content.rendered.format(replacers) : "";

		return (
			<div className="text-center">
				<h3 className="mt0 text-center">{get(page, "fields.tx_waiting_for_the_exchange")}</h3>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />

				<table className="tx-table">
					<tbody>
						<tr>
							<td className="tx-td-qr">
								<img src={qrcode_url} alt="QR code" />
							</td>
							<td className="tx-td-text">
								<div dangerouslySetInnerHTML={{ __html: get(page, "fields.tx_you_need_send").format(replacers) }} />
								<div>
									{get(page, "fields.tx_address").format(replacers)} <b>{data.Deposit}</b>
								</div>
								<div>
									{get(page, "fields.tx_amount_from_request")} <b>{data.PlanAmount}</b> {data.CoinFrom.Symbol}
								</div>
								<div dangerouslySetInnerHTML={{ __html: get(page, "fields.tx_you_will_get_after_sending").format(replacers) }} />
							</td>
						</tr>
					</tbody>
				</table>
				<div className="tx-container" dangerouslySetInnerHTML={{ __html: get(page, "fields.tx_text_after_qr_code").format(replacers) }} />
				
				<br />
				<div>
					<button onClick = {this.handleClick} className="btn btn-primary">{get(page, "fields.tx_refresh_btn")} </button>	
				</div>
			</div>
		);
	}


	getProcessTransaction(replacers = {}) {
		const {page, data } = this.props
		var status = "created";
		if (data.Status && data.Status > 2 && TXStatusEnum[data.Status]) {
			status = TXStatusEnum[data.Status];
		}

		return (
			<div>
				<h3 className="mt0 text-center">{page.title.rendered}</h3>
				<div className="tx-arrow">&rarr;</div>
				<div className="row">
					<div className="col-md-4 overflow-wrap">
						<h4>{get(page, "fields.tx_you_give")}</h4>
						<p>{get(page, "fields.tx_currency").format({valuteName: data.CoinFrom.Name})}</p>
						<p>{get(page, "fields.tx_transaction_id").format(replacers)}</p>
						<p>{get(page, "fields.tx_wallet_id").format({wallet: replacers.deposit})}</p>
						<p>{get(page, "fields.tx_gross").format({valuteSymbol: data.CoinFrom.Symbol, amount: replacers.amount})}</p>
					</div>			
					<div className="col-md-4 tx-centered-col">
						<table className="tx-centered-table">
							<tbody>
								<tr>
									<td>
										<div dangerouslySetInnerHTML={{ __html: get(page, "fields.tx_status_" + status).format(replacers) }} />
										<p style={{borderTop: "1px solid #ccc", paddingTop: "10px"}}>
											{get(page, "fields.tx_date_created")}&nbsp;
											<Moment format="DD.MM.YYYY hh:mm">
												{replacers.created}
											</Moment>
										</p>
										<p>{get(page, "fields.tx_exchange_rate").format(replacers)}</p>
									</td>
								</tr>
							</tbody>
						</table>
						<br />
						<div className="text-center">
							<button onClick = {this.handleClick} className="btn btn-primary">{get(page, "fields.tx_refresh_btn")} </button>	
						</div>
					</div>		
					<div className="col-md-4">
						<h4>{get(page, "fields.tx_you_get")}</h4>
						<p>{get(page, "fields.tx_currency").format({valuteName: data.CoinTo.Name})}</p>
						<p>{get(page, "fields.tx_wallet_id").format(replacers)}</p>
						<p>{get(page, "fields.tx_gross").format({valuteSymbol: data.CoinTo.Symbol, amount: replacers.amountTo})}</p>
					</div>				
				</div>
			</div>
		);
	}

    handleClick = ev => {
    	this.props.getTransactionStatus(this.props.data.HRID)
    }
}

export default Form