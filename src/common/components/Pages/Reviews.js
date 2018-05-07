import React, { Component } from 'react';
import Comments from '../Comments/Comments'
import pageDataContent from '../../decorators/pageDataContent'

class Reviews extends Component {
	render() {
		const {title, content} = this.props.page

		return (
			<div className="container">
				<h1 className="text-center">{title.rendered}</h1>
				<div dangerouslySetInnerHTML={{ __html: content.rendered }} />
				<hr />
                <Comments />
			</div>
		);
	}
}

export default pageDataContent(Reviews) 