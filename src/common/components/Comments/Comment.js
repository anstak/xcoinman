import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';

class Comment extends Component {
	static propTypes = {
		// from attrs
		data: PropTypes.object.isRequired
	}

	render() {
		const {author_name, date_gmt, content } = this.props.data

		return (
            <div className="media">
                <div className="media-body">
                    <p>
                    	<span className="reviewer-name"><strong>{author_name}</strong></span>
                    	<span className="review-date">
				            <Moment format="hh:mm, DD.MM.YYYY">
				                {date_gmt}
				            </Moment>
                    	</span>
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
                </div>
            </div>
		);
	}
}

export default Comment