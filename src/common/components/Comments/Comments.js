import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types'
const dataComments = []

class Comments extends Component {
	static propTypes = {
		// from attrs
		limit: PropTypes.number
	}

	render() {
		const comments = dataComments.map((comment) => {
			return <Comment key={comment.id} data={comment} />
		})

		return (
			<div>
                {comments}
			</div>
		);
	}
}

export default Comments