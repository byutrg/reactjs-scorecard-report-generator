import React, {Component} from 'react'
import ScorecardReportsGenerator from '../containers/ScorecardReportsGenerator'
import Title from '../containers/Title'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Template extends Component {


  render() {
    return (
      <MuiThemeProvider>
        <Title>
          MQM Scorecard Reports Generator
        </Title>
        <ScorecardReportsGenerator/>
      </MuiThemeProvider>
    )
  }
}

export default Template
