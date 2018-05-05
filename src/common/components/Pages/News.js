import React, { Component } from 'react';
import pageDataContent from '../../decorators/pageDataContent'

class News extends Component {
	render() {
		return (
			<div className="container">
				<h1 className="text-center">News</h1>
                <ul className="thread-list">
                    <li className="thread"><span className="time">Apr 21</span><span className="title">Maecenas finibus est nec pretium molestie. </span></li>
                    <li className="thread"><span className="time">Apr 20</span><span className="title">Curabitur consectetur velit pharetra ex eleifend tempor. </span></li>
                    <li className="thread"><span className="time">Apr 20</span><span className="title">Fusce iaculis ligula at nisl mollis suscipit. </span></li>
                    <li className="thread"><span className="time">Apr 18</span><span className="title">Pellentesque tempus augue id risus lacinia vehicula. </span></li>
                    <li className="thread"><span className="time">Apr 17</span><span className="title">Quisque lacinia massa non ex lobortis congue. </span></li>
                </ul>
			</div>
		);
	}
}

export default pageDataContent(News)