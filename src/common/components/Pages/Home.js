import React, { Component } from 'react';
import PaymentSystems from '../routes/PaymentSystems'
import DetailsExchange from '../Exchange/DetailsExchange'

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
			                    <h3>Reviews<button className="btn btn-primary write-review" type="button">Write a review</button></h3>
			                </div>
			                <div className="media">
			                    <div className="media-body">
			                        <h4 className="media-heading">Love this!</h4>
			                        <div><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i></div>
			                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus nisl ac diam feugiat, non vestibulum libero posuere. Vivamus pharetra leo non nulla egestas, nec malesuada orci finibus. </p>
			                        <p><span className="reviewer-name"><strong>John Doe</strong></span><span className="review-date">7 Oct 2015</span></p>
			                    </div>
			                </div>
			                <div className="media">
			                    <div className="media-body">
			                        <h4 className="media-heading">Fantastic product</h4>
			                        <div><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></div>
			                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus nisl ac diam feugiat, non vestibulum libero posuere. Vivamus pharetra leo non nulla egestas, nec malesuada orci finibus. </p>
			                        <p><span className="reviewer-name"><strong>Jane Doe</strong></span><span className="review-date">7 Oct 2015</span></p>
			                    </div>
			                </div>
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