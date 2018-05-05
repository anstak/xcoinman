import React, { Component } from 'react';
import Home from "../Pages/Home" // "../Pages/Home"
import Reviews from "../Pages/Reviews"
import News from "../Pages/News"
import Transaction from "../Pages/Transaction" // "../Pages/Transaction"
import Start from "../Pages/Start"
import {Route, Switch} from 'react-router-dom'





class Main extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/start" component={Start} />
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