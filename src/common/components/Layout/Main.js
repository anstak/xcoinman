import React, { Component } from 'react';
import Home from "../Pages/Home" // "../Pages/Home"
import Reviews from "../Pages/Reviews"
import News from "../Pages/News"
import Transaction from "../Pages/Transaction" // "../Pages/Transaction"
import Start from "../Pages/Start"
import {Route, Switch} from 'react-router-dom'
import {Helmet} from "react-helmet";
const pages = require('json-static')("pages.json") || []

const emptyPage = {
	id: 1,
	date_gmt: "1990-01-01T12:0:00",
	slug: "empty",
	status: "empty",
	type: "page",
	title: {
		rendered: "Страница не найдена"
	},
	content: {
		rendered: "<p>Страница не найдена</p>",
		protected: false
	},
	excerpt: {
		rendered: "<p>Страница не найдена</p>",
		protected: false
	},
	featured_media: 0,
	parent: 0,
	menu_order: 0,
	template: "",
	meta: [ ],
	seo: {
		title: "Страница не найдена",
		description: "Страница не найдена"
	}
}


class Main extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/" exact render={(props) => {
						const page = pages.filter(page => page.slug === "home")[0] || emptyPage
						return (
							<div>
				            	<Helmet>
								    <title>{page.seo.title}</title>
			    					<meta name="description" content={page.seo.description} />
					            </Helmet>
								<Home {...props} page={page} />
							</div>
						)
					}}/>
					<Route path="/:currencyFrom(\w+)-to-:currencyTo(\w+)" component={Home} />
					<Route path='/start' render={(props) => {
						const page = pages.filter(page => page.slug === "start")[0] || emptyPage
						return (
							<div>
				            	<Helmet>
								    <title>{page.seo.title}</title>
			    					<meta name="description" content={page.seo.description} />
					            </Helmet>
								<Start {...props} page={page} />
							</div>
						)
					}}/>
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