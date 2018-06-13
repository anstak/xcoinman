import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {redirectToTransactionFinished, getTransactionStatus} from '../../actions/transaction'
import Loader from '../Shared/Loader'
import ImagesDirection from '../Exchange/ImagesDirection'
import TransactionForm from '../Transaction/Form'
import pageDataContent from '../../decorators/pageDataContent';

class Transaction extends Component {

	static propTypes = {
		// from connect
		page: PropTypes.object,
        transaction: PropTypes.shape({
	        loaded_transaction: PropTypes.bool.isRequired,
	        loading_transaction: PropTypes.bool.isRequired,
	        transactionError: PropTypes.string,
	        transactionData: PropTypes.object
        }).isRequired,
	}

    componentDidMount() {
        const {match: {params: { id }}, transactionDataFromDetails} = this.props
        if (transactionDataFromDetails.HRID) {
           	this.props.redirectToTransactionFinished(transactionDataFromDetails)
        } else {
			this.props.getTransactionStatus(id)
        }
    }

	render() {
		const {page, transaction: {transactionData, loading_transaction, loaded_transaction}} = this.props

		if (!loaded_transaction || loading_transaction) {
			return (
				<div className="container ovh">
					<Loader />
				</div>
			)
		}
		return (
			<div className="container">
				<br />
				<br />
				<TransactionForm data={transactionData} page={page} getTransactionStatus = {this.props.getTransactionStatus} />
			</div>
		);
	}
}

export default connect((state) => {
	return {
		transactionDataFromDetails: state.exchangeInfo.transactionData,
		transaction: state.transaction
	}
}, { redirectToTransactionFinished, getTransactionStatus })(pageDataContent(Transaction))