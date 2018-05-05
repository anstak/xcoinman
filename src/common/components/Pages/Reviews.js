import React, { Component } from 'react';
import Comments from '../Comments/Comments'
import pageDataContent from '../../decorators/pageDataContent'

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

export default pageDataContent(Reviews) 