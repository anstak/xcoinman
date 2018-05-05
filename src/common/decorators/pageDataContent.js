import React, {Component as ReactComponent} from 'react'
import {Helmet} from "react-helmet";
import {connect} from 'react-redux'
import {loadPages} from '../actions/wordpress'
import {mapToArr} from "../helpers"

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

export default (OriginalComponent) => class WrappedComponent extends ReactComponent {

    componentDidMount() {
        debugger;
        // const {loaded_pages, loading_pages, pages, loadPages} = this.props
        // if (!loading_pages && Object.keys(pages).length === 0) loadPages()
    }

    render() {
        //const {loaded_pages, loading_pages, pages, loadPages} = this.props

        var pages = [];

        // if (Object.keys(pages).length === 0) return null

        return <OriginalComponent {...this.props} />
    }
}

// export default connect((state) => {
//     return {
//         pages: state.wordpress.pages,
//         loading_pages: state.wordpress.loading_pages,
//         loaded_pages: state.wordpress.loaded_pages
//     }
// }, {loadPages})(Main)