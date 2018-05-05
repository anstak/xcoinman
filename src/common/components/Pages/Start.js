import React, { Component } from 'react';
import pageDataContent from '../../decorators/pageDataContent';

class Start extends Component {
	render() {
		const {title, content, seo} = this.props.page

		return (
			<div className="container">
				<h1 className="text-center">{title.rendered}</h1>
				<div dangerouslySetInnerHTML={{ __html: content.rendered }} />
			</div>
		);
	}
}

export default pageDataContent(Start) 