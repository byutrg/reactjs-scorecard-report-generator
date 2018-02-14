import React, {Component} from 'react'
import Title from '../containers/Title'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FileUploader from '../containers/FileUploader'

class MainTemplate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      mainContent: (''),
      report_data: window.report_data | null
    }
  }

  componentWillMount() {
    if ('report_data' in window) {
      if (window.report_data.uploadRevised) {
        this.setState({
          mainContent: <FileUploader />
        })
      } else {
        this.props.history.push({
          pathname: '/generator',
          state: {
            uploads: false
          }
        })
      }
    }
  }

  handleSubmit(data) {
    console.log('form submission data', data)
  }

  render() {
    return(
      <MuiThemeProvider>
        <div>
          <Title>
            MQM Scorecard Reports Generator
          </Title>
          {this.state.mainContent}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default MainTemplate
