import React, {Component as ReactComponent} from 'react'
import {Helmet} from "react-helmet";
import {connect} from 'react-redux'
import {loadPages} from '../actions/wordpress'

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
    fields: {
        seo_title: "Страница не найдена",
        seo_description: "Страница не найдена"
    }
}



var pageDataDecorator = function(OriginalComponent) {

    class WrappedComponent extends ReactComponent {

        componentDidMount() {
            const {loaded_pages, loadPages} = this.props
            if (!loaded_pages) {
                loadPages()
            } else {
                window.scrollTo(0, 0);
            }
        }

        render() {
            const {pages, location } = this.props
            const pageName = location.pathname === "/" || /\/(\w+)-to-(\w+)/.test(location.pathname) ? "home" : location.pathname.split("/")[1]
            var page = pages[pageName] || emptyPage
            return (
                <div>
                    <Helmet>
                        <title>{page.fields.seo_title || "XCoinMan"}</title>
                        <meta name="description" content={page.fields.seo_description || "Crypto changer"} />
                    </Helmet>                
                    <OriginalComponent {...this.props} page={page} />
                </div>
            )
        }
    }


    return connect((state) => {
        return {
            pages: state.wordpress.pages,
            loading_pages: state.wordpress.loading_pages,
            loaded_pages: state.wordpress.loaded_pages
        }
    }, {loadPages})(WrappedComponent)

}

export default pageDataDecorator
