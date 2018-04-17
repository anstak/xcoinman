import React, { Component } from 'react';
import PropTypes from 'prop-types'
import QRCode from 'qrcode'

class Form extends Component {
	static propTypes = {
        //from props
        data: PropTypes.shape({
	        Deposit: PropTypes.string.isRequired,
	        DepositType:  PropTypes.string.isRequired     
        }).isRequired,
	}

	render() {
		const { Deposit, DepositType } = this.props.data

		var qrcode_url = "";
		QRCode.toDataURL('3GWBh7pgUrZekcAr4m73NpNcgawgYnLMMm', { errorCorrectionLevel: 'L', version: 8 }, function (err, url) {
		  	qrcode_url = url
		})


		var qrcode_img = <img src={qrcode_url} />

		return (
			<div className="text-center">
				Please make deposit to {DepositType} address: {Deposit} 
				<br />
				<img src={qrcode_url} />
			</div>
		);
	}
}

export default Form