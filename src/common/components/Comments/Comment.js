import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Comment extends Component {
	static propTypes = {
		// from attrs
		data: PropTypes.object.isRequired
	}

	render() {
		const {author_name, date_gmt, content} = this.props.data

		return (
            <div className="media">
                <div className="media-body">
                    <p>
                    	<span className="reviewer-name"><strong>{author_name}</strong></span>
                    	<span className="review-date">7 Oct 2015</span>
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus nisl ac diam feugiat, non vestibulum libero posuere. Vivamus pharetra leo non nulla egestas, nec malesuada orci finibus. </p>
                </div>
            </div>
		);
	}
}

export default Comment