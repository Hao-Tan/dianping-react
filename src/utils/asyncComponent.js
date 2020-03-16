import React, { Component } from 'react'

export default function asyncComponent(importComponent) {

  class asyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        Component: null
      }
    }

    componentWillMount() {
      importComponent().then(mod => {
        this.setState({
          Component: mod.default
        })
      })
    }

    render() {
      const { Component } = this.state
      return Component ? <Component {...this.props} /> : null
    }
  }

  return asyncComponent 
}
