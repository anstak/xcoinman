import React, {Component as ReactComponent} from 'react'

export default (OriginalComponent) => class WrappedComponent extends ReactComponent {
    state = {
        activeItemId: null
    }

    render() {
        return <OriginalComponent {...this.props} toggleActiveItem = {this.toggleActiveItem} activeItemId = {this.state.activeItemId}/>
    }

    toggleActiveItem = activeItemId => ev => {
        this.setState({
            activeItemId: activeItemId === this.state.activeItemId ? null : activeItemId
        })
    }
}