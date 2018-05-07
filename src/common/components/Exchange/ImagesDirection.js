import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ImagesDirection extends Component {
    static propTypes = {
        //from props
        cryptoTo: PropTypes.object.isRequired,
        cryptoFrom: PropTypes.object.isRequired,
    }

	render() {
		const {cryptoTo, cryptoFrom} = this.props
		return (
			<div>
                <h4 className="mt0 text-center">Exhchange {cryptoFrom.Symbol} to {cryptoTo.Symbol} </h4>			
			</div>
		);
	}
}

export default ImagesDirection