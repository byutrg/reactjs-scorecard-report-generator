import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

import {Container} from '../styled/FileUploader'

class Generator extends Component {

  constructor(props) {
    super(props)

    this.state = {
      originalReady: false,
      revisedReady: false,
      scorecardReportReady: false,

      sourceOriginal: ('report_data' in window) ? window.report_data.segments.source : [],
      targetOriginal: ('report_data' in window) ? window.report_data.segments.target : [],

      useRevised: ('report_data' in window) ? window.report_data.useRevised : false,
      sourceRevised: [],
      targetRevised: [],

      scorecardReport: null,

      error: <div></div>
    }
  }

  componentWillMount() {
    if (typeof(this.props.location.state) === 'undefined') {
      this.props.history.push('/')
    }


    if (this.state.sourceOriginal.length < 1 || this.state.targetOriginal.length < 1) {
      this.setOriginalContents()
    } else {
      this.setState({originalReady: true})
    }

    if (this.state.useRevised && (this.state.sourceRevised.length < 1 || this.state.targetRevised.length < 1)) {
      this.setRevisedContents()
    }

    if (!('report_data' in window)) {
      this.setScorecarReportContents()
    } else {
      this.setState({
         scorecardReport: window.report_data,
         scorecardReportReady: true
      })
    }
    this.checkContents()

  }

  generateReport() {
    this.props.history.push({
      pathname: '/report',
      state: {
        sourceSegments: this.state.sourceOriginal,
        targetOriginal: this.state.targetOriginal,
        targetRevised: this.state.targetRevised,
        scorecardReport: this.state.scorecardReport
      }
    })
  }

  checkContents = function() {
    if (this.state.originalReady && (this.state.revisedReady || !this.state.useRevised) && this.state.scorecardReportReady) {
      this.alignContents() ? this.generateReport() : this.triggerBadUpload()
    } else {
      setTimeout(this.checkContents, 1000)
    }

    return true
  }.bind(this)

  setOriginalContents() {
    this.setContents(this.props.location.state.originalFile, 'original')
  }

  setRevisedContents() {
    this.setContents(this.props.location.state.revisedFile, 'revised')
  }

  setScorecarReportContents() {
    this.setContents(this.props.location.state.scorecardReportFile, 'scorecardReport')
  }

  setContents(file, type) {
    var reader = new FileReader()
    reader.onload = function (e) {
        var contents = reader.result
        if (contents) {
          if (type === "scorecardReport") {
            this.setState({
               scorecardReport: JSON.parse(contents),
               scorecardReportReady: true
            })
             return;
          }


          var rows = contents.split(/\r?\n/)
          for (let row of rows) {
            let columns = row.split(/\t/)

            if (type === "original") {
              if (columns[0] !== '0' && columns[0]){
                this.state.sourceOriginal.push(columns[0])
              }
              if (columns[1] !== '' && columns[1]) {
                this.state.targetOriginal.push(columns[1])
              }
              this.setState({originalReady: true})
            } else if (type === "revised") {
              if (columns[0] !== '' && columns[0]) {
                this.state.sourceRevised.push(columns[0])
              }
              if (columns[1] !== '' && columns[1]) {
                this.state.targetRevised.push(columns[1])
              }
              this.setState({revisedReady: true})
            }
          }
        }
    }.bind(this, type)
    reader.readAsText(file)
  }

  triggerBadUpload() {
    this.setState({
      error:
        <div>
          <p style={{fontSize: 24}}>The uploaded bitext files do not appear to share the same segmentation or do not appear to be from the same project.</p>
          <p style={{fontSize: 24}}>Would you like to:</p>
          <div style={{padding: 25}}>
            <RaisedButton
              label="Re-Upload"
              labelStyle={{ 'fontSize': 32 }}
              labelPosition="before"
              style={{marginRight: 20, padding: 5}}
              containerElement="label"
              onClick={() => {this.props.history.push('/')}}
              />
              <RaisedButton
                label="Continue"
                labelStyle={{ 'fontSize': 32 }}
                labelPosition="before"
                style={{marginLeft: 20, padding: 5}}
                containerElement="label"
                onClick={this.generateReport.bind(this)}
                />
          </div>
        </div>
    })
  }


  alignContents() {
    var aligned = true

    if (this.state.targetRevised.length > 0) {
      if(!this.checkContentMatch(this.state.sourceOriginal, this.state.sourceRevised, 5) ||
        !this.checkContentMatch(this.state.targetOriginal, this.state.targetRevised)
      ) {
        aligned = false
      }
    } else {
      if (this.state.sourceOriginal.length !== this.state.targetOriginal.length) {
        console.log(this.state.sourceOriginal.length +  " " + this.state.targetOriginal.length)
        aligned = false
      }
    }

    return aligned
  }

  getMaxPermissibleDistance(text, percentage = .4) {
    var sansSpaceText = text.replace(/\s/g,'')
    return sansSpaceText.length * percentage
  }

  checkContentMatch(array1, array2, maxDistance = null)
  {
    if (array1.length !== array2.length) return false
    var levenshtein = require('fast-levenshtein')

    for (let i = 0; i < array1.length; i++)
    {
      let max = maxDistance
      if (!max) {
        max = this.getMaxPermissibleDistance(array1[i])
      }

      let distance = levenshtein.get(array1[i].replace(/\s/g, ''), array2[i].replace(/\s/g, ''))

      if (distance > max)
      {
        return false
      }
    }

    return true
  }



  render() {
    return(
      <MuiThemeProvider>
        <Container>
          <p style={{fontSize: 32, width: 300, margin: '45px auto'}}>Generating Report...</p>
          <div style={{height: 275, width: '100%', position: 'absolute', bottom: 115, textAlign: 'center'}}>{this.state.error}</div>
        </Container>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(Generator)
