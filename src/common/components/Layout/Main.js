import React, { Component } from 'react';
import Home from "../Pages/Home" // "../Pages/Home"
import Reviews from "../Pages/Reviews"
import News from "../Pages/News"
import Transaction from "../Pages/HowToStart" // "../Pages/Transaction"
import HowToStart from "../Pages/HowToStart"
import {Route, Switch} from 'react-router-dom'

class Main extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/how-to-start" component={HowToStart} />
					<Route path="/" exact component={Home} />
					<Route path="/:currencyFrom(\w+)-to-:currencyTo(\w+)" component={Home} />
					<Route path="/reviews" component={Reviews} />
					<Route path="/news" component={News} />
					<Route path="/txid/:id" component={Transaction} />
					<Route render={() => <h1 className="container text-center">Page not found</h1>}/>
				</Switch>				
			</div>
		);
	}
}

export default Main