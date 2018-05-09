import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';

class Header extends Component {
	render() {
		const {pages} = this.props

		const authBtns = []
		// [
	 //        <button className="btn btn-info navbar-btn navbar-right" type="button"><strong>SIGN UP</strong></button>,
	 //        <button className="btn btn-primary navbar-btn navbar-right" type="button"><strong>SIGN IN</strong></button>
		// ]
		return (
			<nav className="navbar navbar-default">
			    <div className="container">
			        <div className="navbar-header">
			        	<NavLink activeStyle={{color: '#336699'}} className="navbar-brand" exact to='/'>XcoinMAN</NavLink>
			        	<button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button></div>
			        <div
			            className="collapse navbar-collapse" id="navcol-1">
			            <ul className="nav navbar-nav">
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/start'>{pages.start.fields.menu_name}</NavLink></li>
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/reviews'>{pages.reviews.fields.menu_name}</NavLink></li>
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/news'>{pages.news.fields.menu_name}</NavLink></li>
			            </ul>
			            { authBtns }
			        </div>
			    </div>
			</nav>
		);
	}
}

export default connect((state) => {return { pages: state.wordpress.pages }}, null, null, {
  pure: false
})(Header)