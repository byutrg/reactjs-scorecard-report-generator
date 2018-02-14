import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'

import {Container, TopContainer, styles} from '../styled/FileUploader'
import UploadBlock from '../containers/UploadBlock'

class FileUploader extends Component {

  state = {
    revisedFile: null,

    revisedReady: false,
    sourceRevised: [], //should be identical to sourceOriginal
    targetRevised: [],

    results: '',

    generate: false
  }

  uploadRevised = (file) => {
    this.setState({revisedFile: file})
    return true
  }

  generateReport = () => {
    if (this.state.originalFile && this.state.revisedFile && this.state.scorecardReportFile) {
      this.props.history.push({
        pathname: '/generator',
        state: {
          revisedFile: this.state.revisedFile,
          acceptance: this.state.acceptance
        }
      })
    }
  }

  setAcceptance = (e, value) => {
    this.setState({
      acceptance: value
    })
  }

  render() {
    return (
      <Container>
        <TopContainer>
          <UploadBlock
            circleNumber='1'
            imageColor='yellow'
            buttonLabel="Upload revised Bitext"
            uploadTask={this.uploadRevised}
            fileTypes=".txt, .csv"
          />
        </TopContainer>
        <RaisedButton
          label="Generate Report"
          labelStyle={{ 'fontSize': 32 }}
          labelPosition="before"
          style={styles.submitButton}
          containerElement="label"
          onClick={this.generateReport}
          />
      </Container>
    )
  }
}
export default withRouter(FileUploader)
