import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import {NavLink} from 'react-router-dom'

class Single extends Component {
	static propTypes = {
		// from attrs
		data: PropTypes.object.isRequired,
		type: PropTypes.string
	}

	render() {
		if (this.props.type === "short") return this.getShortSingle()
		return this.getFullSingle()
	}

	getShortSingle = () => {
		const {date_gmt, title } = this.props.data
		return (
            <li className="">
            	<NavLink className="thread" to='/news'>
	            	<span className="time">
			            <Moment format="DD.MM.YYYY">
			                {date_gmt}
			            </Moment>
	            	</span>
	            	<span className="title">{title.rendered}</span>
            	</NavLink>
            </li>
		);
	}

	getFullSingle = () => {
		const {date_gmt, title, content } = this.props.data
		return (
            <li className="">
				<hr />
            	<h4 className="title title-full-news">{title.rendered}</h4>
            	<span className="time">
		            <Moment format="DD.MM.YYYY">
		                {date_gmt}
		            </Moment>
            	</span>
            	<br />
            	<br />
				<div dangerouslySetInnerHTML={{ __html: content.rendered }} />
            </li>
		);
	}
}

export default Single