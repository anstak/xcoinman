import React, { Component } from 'react';
import Header from "../components/Layout/Header"
import Footer from "../components/Layout/Footer"
import Main from "../components/Layout/Main"
import { YMInitializer } from 'react-yandex-metrika';
var config = require('../../../config')

export default class App extends Component {
  render() {
    return (
		<div className="Site">
			<Header />
			<Main />
			<Footer />
			<YMInitializer accounts={[config.metrika]} />
		</div>
    );
  }
}
