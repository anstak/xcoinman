import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadComments} from '../../actions/wordpress'

class Comments extends Component {
	static propTypes = {
		// from attrs
		limit: PropTypes.number
	}


    componentDidMount() {
        const {loaded_comments, loadComments} = this.props
        if (!loaded_comments) loadComments()
    }

	render() {
		const {comments} = this.props

		const commentsHtml = comments.map((comment) => {
			return <Comment key={comment.id} data={comment} />
		})

		return (
			<div>
                {commentsHtml}
			</div>
		);
	}
}

export default connect((state) => {
    return {
        comments: state.wordpress.comments,
        loading_comments: state.wordpress.loading_comments,
        loaded_comments: state.wordpress.loaded_comments
    }
}, { loadComments })(Comments)