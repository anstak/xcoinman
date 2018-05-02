import React, { Component } from 'react';
import PaymentSystems from '../routes/PaymentSystems'
import DetailsExchange from '../Exchange/DetailsExchange'
import Comments from '../Comments/Comments'
import JsonStatic from 'json-static'
const articles = JsonStatic("posts.json")

class Home extends Component {

	render() {
		return (
			<div>
			    <div className="container">
			        <div className="row main-info-flex">
			            <div className="col-md-7 col-md-offset-0 exchange-info">
			            	<PaymentSystems />
			            </div>
			            <div className="col-md-5 details-info">
			            	<DetailsExchange />
			            </div>
			        </div>
			        <div className="row">
			            <div className="col-md-6">
			                <div className="page-header">
			                    <h3>
			                    	<button className="btn btn-primary write-review" type="button">Read all reviews</button>
			                    	Reviews
			                    </h3>
			                </div>
		                	<Comments limit={5} />
			            </div>
			            <div className="col-md-6">
			                <div className="page-header">
			                    <h3>News </h3>
			                </div>
			                <ul className="thread-list">
			                    <li className="thread"><span className="time">Apr 21</span><span className="title">Maecenas finibus est nec pretium molestie. </span></li>
			                    <li className="thread"><span className="time">Apr 20</span><span className="title">Curabitur consectetur velit pharetra ex eleifend tempor. </span></li>
			                    <li className="thread"><span className="time">Apr 20</span><span className="title">Fusce iaculis ligula at nisl mollis suscipit. </span></li>
			                    <li className="thread"><span className="time">Apr 18</span><span className="title">Pellentesque tempus augue id risus lacinia vehicula. </span></li>
			                    <li className="thread"><span className="time">Apr 17</span><span className="title">Quisque lacinia massa non ex lobortis congue. </span></li>
			                </ul>
			            </div>
			        </div>
			    </div>
			</div>
		);
	}
}

export default Home