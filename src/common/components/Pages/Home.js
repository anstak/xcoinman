import React, { Component } from 'react';
import PaymentSystems from '../routes/PaymentSystems'
import DetailsExchange from '../Exchange/DetailsExchange'
import Comments from '../Comments/Comments'
import News from '../News/News'
import {NavLink} from 'react-router-dom'
import pageDataContent from '../../decorators/pageDataContent';
import PropTypes from 'prop-types';

class Home extends Component {

    static propTypes = {
        //from decorator
        page: PropTypes.object.isRequired
    }

	render() {
		const {page} = this.props
		return (
			<div>
			    <div className="container">
			        <div className="row main-info-flex">
			            <div className="col-md-7 col-md-offset-0 exchange-info">
			            	<PaymentSystems page={page} />
			            </div>
			            <div className="col-md-5 details-info">
			            	<DetailsExchange />
			            </div>
			        </div>
			        <div className="row">
			            <div className="col-md-6">
			                <div className="page-header">
			                    <h3>{page.fields.home_reviews_title}</h3>
			                </div>
		                	<Comments limit={5} />
		                	<br />
		                	<NavLink className="btn btn-primary" to='/reviews'>{page.fields.home_reviews_read_all}</NavLink>
			            </div>
			            <div className="col-md-6">
			                <div className="page-header">
			                    <h3>{page.fields.home_news_title}</h3>
			                </div>
		                	<News limit={5} type="short" />
		                	<br />
		                	<NavLink className="btn btn-success" to='/news'>{page.fields.home_news_read_all}</NavLink>
			            </div>
			        </div>
			    </div>
			</div>
		);
	}
}

export default pageDataContent(Home)