import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Template from '../containers/Template'

class Router extends Component {

  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path='/' component={Template} />
        </Switch>
      </HashRouter>
    )
  }
}

export default Router
