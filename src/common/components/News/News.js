import React, { Component } from 'react';
import Single from './Single';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadNews} from '../../actions/wordpress'

class News extends Component {
	static propTypes = {
		// from attrs
		limit: PropTypes.number,
		type: PropTypes.string
	}


    componentDidMount() {
        const {loaded_news, loadNews} = this.props
        if (!loaded_news) loadNews()
    }

	render() {
		const {news, type, limit} = this.props

		const newsHtml = news.filter((s,i) => !limit || i < limit).map((single) => {
			return <Single key={single.id} data={single} type={type} />
		})

		return (
			<div>                
				<ul className="thread-list">
                	{newsHtml}
                </ul>		
			</div>
		);
	}
}

export default connect((state) => {
    return {
        news: state.wordpress.news,
        loading_news: state.wordpress.loading_news,
        loaded_news: state.wordpress.loaded_news
    }
}, { loadNews })(News)