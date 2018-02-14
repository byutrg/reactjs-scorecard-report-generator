import React, {Component} from 'react'
import MultiFileUploader from '../containers/MultiFileUploader'
import Title from '../containers/Title'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class SecondaryTemplate extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Title>
            MQM Scorecard Reports Generator
          </Title>
          <MultiFileUploader/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default SecondaryTemplate
