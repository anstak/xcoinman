import React, { Component } from 'react';
import Header from "../components/Layout/Header"
import Footer from "../components/Layout/Footer"
import Main from "../components/Layout/Main"

export default class App extends Component {
  render() {
    return (
		<div>
			<Header />
			<Main />
			<Footer />
		</div>
    );
  }
}
