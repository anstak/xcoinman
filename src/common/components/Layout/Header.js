import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import { get } from "../../helpers"
import { Navbar } from 'react-bootstrap';

class Header extends Component {
	render() {
		const {pages} = this.props

		const authBtns = []
		// [
	 //        <button className="btn btn-info navbar-btn navbar-right" type="button"><strong>SIGN UP</strong></button>,
	 //        <button className="btn btn-primary navbar-btn navbar-right" type="button"><strong>SIGN IN</strong></button>
		// ]
		return (
			<Navbar collapseOnSelect>
			    <div className="container">
			        <div className="navbar-header">
			        	<NavLink activeStyle={{color: '#336699'}} className="navbar-brand" exact to='/'>XcoinMAN</NavLink>
			        	<Navbar.Toggle />
		        	</div>
			        <Navbar.Collapse>
			            <ul className="nav navbar-nav">
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/start'>{get(pages, "start.fields.menu_name")}</NavLink></li>
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/reviews'>{get(pages, "reviews.fields.menu_name")}</NavLink></li>
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/faq'>{get(pages, "faq.fields.menu_name")}</NavLink></li>
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/news'>{get(pages, "news.fields.menu_name")}</NavLink></li>
			            </ul>
			            { authBtns }
			        </Navbar.Collapse>
			    </div>
			</Navbar>
		);
	}
}

export default connect((state) => {return { pages: state.wordpress.pages }}, null, null, {
  pure: false
})(Header)