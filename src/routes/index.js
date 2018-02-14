import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import MainTemplate from '../containers/MainTemplate'
import SecondaryTemplate from '../containers/SecondaryTemplate'
import Generator from '../containers/Generator'
import Report from '../containers/Report'

class Router extends Component {
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route exact path='/' component={('report_data' in window) ? MainTemplate : SecondaryTemplate} />
          <Route exact path='/generator' component={Generator} />
          <Route exact path='/report' component={Report} />
        </Switch>
      </HashRouter>
    )
  }
}

export default Router
