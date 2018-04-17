import React, { Component } from 'react';
import PaymentSystems from '../PaymentSystems/PaymentSystems'
import {Route} from "react-router-dom"

class Change extends Component {
	render() {
		return (
			<div>
				<Route path="/" render={this.getPaymentSystems} />
				
			</div>
		);
	}

	getPaymentSystems = (props) => {
		const {match, history, location} = props;
		// if (match.params.currencyFrom && match.params.currencyTo) {

		// }
		//<Route path={`${match.url}/:topicId`} component={Topic}/>
		const regex = /(\w+)-to-(\w+)/g
		const found = regex.exec(location.pathname);
		if (found && found.length >= 2) {
			var params = {
				currencyFrom: found[1],
				currencyTo: found[2]
			}
			return <PaymentSystems {...params} history={history} />
		} else {
			
			return <PaymentSystems {...match.params} history={history} />
		}
		
	}
}

export  default Change