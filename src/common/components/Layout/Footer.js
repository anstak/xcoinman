import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
		    <footer className="site-footer">
		        <div className="container">
		            <hr />
		            <div className="row">
		                <div className="col-sm-6">
		                    <h5>XcoinMAN © 2018</h5>
		                </div>
		                <div className="col-sm-6 social-icons">
		                	<a href=""><i className="fa fa-facebook"></i></a>
		                	<a href=""><i className="fa fa-twitter"></i></a>
		                </div>
		            </div>
		        </div>
		    </footer>
		);
	}
}

export default Footer