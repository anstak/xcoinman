import React, { Component } from 'react';
import PaymentSystems from '../routes/PaymentSystems'
import DetailsExchange from '../Exchange/DetailsExchange'
import Comments from '../Comments/Comments'
import News from '../News/News'
import {NavLink} from 'react-router-dom'
import pageDataContent from '../../decorators/pageDataContent';

class Home extends Component {

	render() {
		//const {title, content, seo} = this.props.page
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
			                    	<NavLink className="btn btn-primary write-review" to='/reviews'>Read all reviews</NavLink>
			                    	Reviews
			                    </h3>
			                </div>
		                	<Comments limit={5} />
			            </div>
			            <div className="col-md-6">
			                <div className="page-header">
			                    <h3>News </h3>
			                </div>
		                	<News limit={5} type="short" />
			            </div>
			        </div>
			    </div>
			</div>
		);
	}
}

export default pageDataContent(Home)