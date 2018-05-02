import React, { Component } from 'react';
import Comments from '../Comments/Comments'

class Reviews extends Component {
	render() {
		return (
			<div className="container">
				<h1 className="text-center">Reviews</h1>
                <br />
                <Comments />
			</div>
		);
	}
}

export default Reviews