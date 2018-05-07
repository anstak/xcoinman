import React, { Component } from 'react';
import Single from './Single';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadNews} from '../../actions/wordpress'

class News extends Component {
	static propTypes = {
		// from attrs
		limit: PropTypes.number
	}


    componentDidMount() {
        const {loaded_news, loading_news, news, loadNews} = this.props
        if (!loaded_news) loadNews()
    }

	render() {
		const {news, loading_news, loaded_news} = this.props

		const newsHtml = news.map((single) => {
			return <Single key={single.id} data={single} />
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