import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {redirectToTransactionFinished, getTransactionStatus} from '../../actions/transaction'
import Loader from '../Shared/Loader'
import ImagesDirection from '../Exchange/ImagesDirection'
import TransactionForm from '../Transaction/Form'

class Transaction extends Component {

	static propTypes = {
		// from connect
        transaction: PropTypes.shape({
	        loaded_transaction: PropTypes.bool.isRequired,
	        loading_transaction: PropTypes.bool.isRequired,
	        transactionError: PropTypes.string,
	        transactionData: PropTypes.object
        }).isRequired,
	}

    componentDidMount() {
        const {match: {params: { id }}, transactionDataFromDetails} = this.props
        if (transactionDataFromDetails.ID) {
           	this.props.redirectToTransactionFinished(transactionDataFromDetails)
        } else {
			this.props.getTransactionStatus(id)
        }
    }

	render() {
		const {transactionData, loading_transaction, loaded_transaction} = this.props.transaction
		if (!loaded_transaction || loading_transaction) {
			return (
				<div className="container ovh">
					<Loader />
				</div>
			)
		}
		const {CoinFrom: cryptoFrom, CoinTo: cryptoTo} = transactionData
		
		return (
			<div className="container">
				<br />
				<ImagesDirection cryptoTo={cryptoTo} cryptoFrom={cryptoFrom} />
				<TransactionForm data={transactionData} />
			</div>
		);
	}
}

export default connect((state) => {
	return {
		transactionDataFromDetails: state.exchangeInfo.transactionData,
		transaction: state.transaction
	}
}, { redirectToTransactionFinished, getTransactionStatus })(Transaction)