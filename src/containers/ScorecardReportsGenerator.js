import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'

import {Container, TopContainer, RadioGroup, styles} from '../styled/ScorecardReportsGenerator'
import UploadBlock from '../containers/UploadBlock'

class ScorecardReportsGenerator extends Component {

  state = {
    acceptance: 'Acceptable',

    originalFile: null,
    revisedFile: null,
    scorecardReportFile: null,

    originalReady: false,
    sourceOriginal: [],
    targetOriginal: [],

    revisedReady: false,
    sourceRevised: [], //should be identical to sourceOriginal
    targetRevised: [],

    scorecardReportReady: false,
    scorecardReport: null,

    results: '',

    generate: false
  }

  uploadOriginal = (file) => {
    this.setState({originalFile: file})
    return true
  }

  uploadRevised = (file) => {
    this.setState({revisedFile: file})
    return true
  }

  uploadScorecardData = (file) => {
    this.setState({scorecardReportFile: file})
    return true
  }

  generateReport = () => {
    if (this.state.originalFile && this.state.revisedFile && this.state.scorecardReportFile) {
      this.props.history.push({
        pathname: '/generator',
        state: {
          originalFile: this.state.originalFile,
          revisedFile: this.state.revisedFile,
          scorecardReportFile: this.state.scorecardReportFile,
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
              imageColor='red'
              buttonLabel="Upload original Bitext"
              uploadTask={this.uploadOriginal}
              fileTypes=".txt, .csv"
            />
            <UploadBlock
              circleNumber='2'
              imageColor='yellow'
              buttonLabel="Upload revised Bitext"
              uploadTask={this.uploadRevised}
              fileTypes=".txt, .csv"
            />
            <UploadBlock
              circleNumber='3'
              imageColor='green'
              buttonLabel="Upload Scorecard results"
              uploadTask={this.uploadScorecardData}
              fileTypes=".json"
            />
          <RadioGroup
            circleNumber='4'
            selected={this.state.acceptance}
            callback={this.setAcceptance}
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
export default withRouter(ScorecardReportsGenerator)
