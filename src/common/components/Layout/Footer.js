import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {
	render() {
		const {page} = this.props

		return (
		    <footer className="site-footer">
		        <div className="container text-left">
		            <hr />
		            <div className="row">
		                <div className="col-sm-6">
		                    <strong className="footer-logo">XcoinMAN</strong> 
		                    <span>{page.fields.footer_copyright}</span>
		                </div>
		                <div className="col-sm-6">
		                	<a href="" className="pull-right">
								<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 512 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"/></svg>
		                	</a>
		                	<a href="" className="pull-right">
								<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 512 512"><path d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"/></svg>
		                	</a>
		                </div>
		            </div>
		        </div>
		    </footer>
		);
	}
}

export default connect((state) => {return { page: state.wordpress.pages["home"] }})(Footer)