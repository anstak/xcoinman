import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import { get } from "../../helpers"

class Footer extends Component {
	render() {
		const {pages} = this.props
		const home = pages["home"]

		return (
		    <footer className="site-footer">
		        <div className="container text-left">
		            <hr />
		            <div className="row">
		                <div className="col-sm-6">
		                    <strong className="footer-logo">XcoinMAN</strong> 
		                    <span>{get(home, "fields.footer_copyright")}</span>
		                </div>
		                <div className="col-sm-6">
				            <ul className="nav navbar-nav pull-right">
				                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/about'>{get(pages, "about.fields.menu_name")}</NavLink></li>
				                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/rates'>{get(pages, "rates.fields.menu_name")}</NavLink></li>
				                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/terms-of-service'>{get(pages, "terms-of-service.fields.menu_name")}</NavLink></li>
				            </ul>
		                </div>
		            </div>
		        </div>
		    </footer>
		);
	}
}

export default connect((state) => {return { pages: state.wordpress.pages }})(Footer)