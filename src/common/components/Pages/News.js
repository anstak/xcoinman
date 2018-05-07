import React, { Component } from 'react';
import pageDataContent from '../../decorators/pageDataContent'
import FullNews from '../News/News'

class News extends Component {
	render() {
		const {title, content} = this.props.page

		return (
			<div className="container">
				<h1 className="text-center">{title.rendered}</h1>
				<div dangerouslySetInnerHTML={{ __html: content.rendered }} />
                <FullNews />
			</div>
		);
	}
}

export default pageDataContent(News)