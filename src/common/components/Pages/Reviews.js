import React, { Component } from 'react';

class Reviews extends Component {
	render() {
		return (
			<div className="container">
				<h1 className="text-center">Reviews</h1>
                <div className="media">
                    <div className="media-body">
                        <h4 className="media-heading">Love this!</h4>
                        <div><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus nisl ac diam feugiat, non vestibulum libero posuere. Vivamus pharetra leo non nulla egestas, nec malesuada orci finibus. </p>
                        <p><span className="reviewer-name"><strong>John Doe</strong></span><span className="review-date">7 Oct 2015</span></p>
                    </div>
                </div>
                <div className="media">
                    <div className="media-body">
                        <h4 className="media-heading">Fantastic product</h4>
                        <div><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus nisl ac diam feugiat, non vestibulum libero posuere. Vivamus pharetra leo non nulla egestas, nec malesuada orci finibus. </p>
                        <p><span className="reviewer-name"><strong>Jane Doe</strong></span><span className="review-date">7 Oct 2015</span></p>
                    </div>
                </div>
			</div>
		);
	}
}

export default Reviews