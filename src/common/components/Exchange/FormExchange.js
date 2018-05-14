import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createTransaction} from '../../actions/exchangeInfo'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import Loader from '../Shared/Loader'
import {Redirect} from 'react-router-dom'
const format = require('string-format').extend(String.prototype, {})

class FormExchange extends Component {
    static propTypes = {
        //from props
        exchangeInfo: PropTypes.object.isRequired,
        cryptoTo: PropTypes.object.isRequired,
        cryptoFrom: PropTypes.object.isRequired,
        page: PropTypes.object.isRequired,

        //from connect
        createTransaction: PropTypes.func.isRequired
    }

    state = {
        Wallet: "",
        RefundWallet: "",
        Email: "",
        AgreeRules: false,
        Errors: {}
    }

	render() {
		const {page, cryptoTo, cryptoFrom, exchangeInfo: { transactionError, loading_transaction, transactionData }} = this.props

        var valuteReplacers = {valute1: cryptoFrom.Symbol, valute2: cryptoTo.Symbol}
        var loader = null
        if (loading_transaction) {
            loader = <div className="loader-abs"><Loader /></div>
        }

        if (transactionData.ID) {
            return <Redirect push to={"/txid/" + transactionData.ID} />
        }

		return (
			<div>
                <form onSubmit = {this.handleSubmit} className="bootstrap-form-with-validation">
                    <fieldset disabled={loading_transaction}>
                        <div className="loader-container">
                            {loader}
                            <div className={this.getClassName("Email")} >
                                <label className="control-label" htmlFor="Wallet">{page.fields.form_your_email}</label>
                                <input className="form-control" value = {this.state.Email} onChange = {this.handleChange} name="Email" type="text" placeholder={page.fields.form_your_email_placeholder} />
                            </div>
                            <div className={this.getClassName("Wallet")} >
                                <label className="control-label" htmlFor="Wallet">
                                    {page.fields.form_address_to_receive ? page.fields.form_address_to_receive.format(valuteReplacers) : ""}
                                </label>
                                <input className="form-control" value = {this.state.Wallet} onChange = {this.handleChange} name="Wallet" type="text" placeholder={page.fields.form_address_to_receive_placeholder} />
                            </div>
                            <div className={this.getClassName("RefundWallet")} >
                                <label className="control-label" htmlFor="RefundWallet">
                                    {page.fields.form_address_from_send ? page.fields.form_address_from_send.format(valuteReplacers) : ""}
                                </label>
                                <input className="form-control" value = {this.state.RefundWallet} onChange = {this.handleChange} name="RefundWallet" type="text" placeholder={page.fields.form_address_from_send_placeholder} />
                            </div>
                            <div className={this.getClassName("AgreeRules")}>
                                <div className="checkbox">
                                    <label className="control-label">
                                        <input type="checkbox" value = {this.state.AgreeRules} onChange = {this.handleChange} name="AgreeRules" />
                                        {page.fields.form_rules}
                                    </label>
                               </div>
                            </div>
                        </div>

                        <CSSTransition in={transactionError ? true : false} timeout={1000} classNames="fade" mountOnEnter={true} unmountOnExit={true}>           
                            <div className="ovh">
                                <div className="alert alert-danger">
                                    {transactionError}&nbsp;
                                </div>
                            </div>
                        </CSSTransition>   
                        
                        <br /> 
                        <button className="btn btn-primary" type="submit">{page.fields.form_make_exchange_btn}</button>	
                    </fieldset>
                </form>

                				
			</div>
		);
	}


    getClassName(name) {
        var classes = ["form-group"]
        if (this.state.Errors[name]) classes.push("has-error")
        return classes.join(" ")
    }

    handleSubmit = ev => {
        ev.preventDefault()

        const {cryptoTo, cryptoFrom, exchangeInfo: { amount_from, rate }} = this.props
        const {Wallet, RefundWallet, Email} = this.state

        if (!this.checkValidation()) return false

        var transaction = {
        	CoinToID: cryptoTo.ID,
        	CoinFromID: cryptoFrom.ID,
        	Wallet,
        	RefundWallet,
            Email,
            PlanAmount: amount_from*1,
            PlanRate: rate.rate
        }

        this.props.createTransaction(transaction)
    }

    checkValidation() {
        const {Wallet, RefundWallet, Email, AgreeRules} = this.state

        var _Errors = {
            Email: Email.length < 5,
            Wallet: Wallet.length < 5,
            RefundWallet: RefundWallet.length < 5,
            AgreeRules: !AgreeRules
        }
        
        this.setState({Errors: _Errors});

        if (Object.values(_Errors).indexOf(true) > -1) {
            return false
        }
        return true
    }

    handleChange = ev => {
        const target = ev.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var _Errors = Object.assign({}, this.state.Errors)
        delete _Errors[name]

        var _state = {
            [name]: value,
            Errors: _Errors
        }
        this.setState(_state);
    }
}

export default connect(null, { createTransaction })(FormExchange)