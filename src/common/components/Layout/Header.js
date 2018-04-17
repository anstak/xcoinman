import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-default">
			    <div className="container">
			        <div className="navbar-header">
			        	<NavLink activeStyle={{color: '#336699'}} className="navbar-brand" exact to='/'>XcoinMAN</NavLink>
			        	<button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button></div>
			        <div
			            className="collapse navbar-collapse" id="navcol-1">
			            <ul className="nav navbar-nav">
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/how-to-start'>How to start</NavLink></li>
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/reviews'>Reviews</NavLink></li>
			                <li role="presentation"><NavLink activeStyle={{color: '#336699'}} to='/news'>News</NavLink></li>
			            </ul><button className="btn btn-info navbar-btn navbar-right" type="button"><strong>SIGN UP</strong></button><button className="btn btn-primary navbar-btn navbar-right" type="button"><strong>SIGN IN</strong></button></div>
			    </div>
			</nav>
		);
	}
}

export default Header