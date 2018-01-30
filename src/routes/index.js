import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Template from '../containers/Template'
import Generator from '../containers/Generator'
import Report from '../containers/Report'

class Router extends Component {

  render(){
    return(
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Template} />
          <Route exact path='/generator' component={Generator} />
          <Route exact path='/report' component={Report} />
        </Switch>
      </HashRouter>
    )
  }
}

export default Router
