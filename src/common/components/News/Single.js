import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import {NavLink} from 'react-router-dom'

class Single extends Component {
	static propTypes = {
		// from attrs
		data: PropTypes.object.isRequired
	}

	render() {
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
}

export default Single