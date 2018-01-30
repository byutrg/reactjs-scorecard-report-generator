import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionPrint from 'material-ui/svg-icons/action/print'
import $ from 'jquery'
import Moment from 'moment'

import IssueType from '../containers/IssueType'

import htmlDocx from 'html-docx-js/dist/html-docx'
import FileSaver from 'file-saver'

import '../css/Report.css'

class Report extends Component {

  printButton = {
    filled:
      <FloatingActionButton
        style={{position: 'fixed', top: 30, left: 30}}
        onClick={this.isPrintClicked.bind(this)}
        >
        <ActionPrint />
      </FloatingActionButton>,
      empty: ''
  }

  restartButton = {
    filled:
      <FloatingActionButton
        style={{position: 'fixed', top: 90, left: 30}}
        secondary={true}
        onClick={this.returnHome.bind(this)}
        >
        <ActionHome />
      </FloatingActionButton>,
      empty: ''
  }

  constructor(props) {
    super(props)

    if (this.props.location.state === undefined) {
      this.props.history.push('/')
    }

    if (this.props.location.state.sourceSegments === undefined) {
      this.props.history.push('/')
    }

    this.state = {
      acceptance: this.props.location.state.acceptance,
      sourceSegments: this.props.location.state.sourceSegments,
      targetOriginal: this.props.location.state.targetOriginal,
      targetRevised: this.props.location.state.targetRevised,
      scorecardReport: this.props.location.state.scorecardReport,
      scores: {},
      issueReportShown: false,
      issueSegments: {},
      highlightedSegments: {},
      hasHighlighted: false,
      notedSegments: {},
      report: <tr><td>loading table...</td></tr>,
      printButton: this.printButton.filled,
      restartButton: this.restartButton.filled,
      flattenedCss: false
    }


  }

  componentWillMount() {
    this.setState({
      scores: this.state.scorecardReport.scores,
      issueSegments: this.getIssues(),
      highlightedSegments: this.getHighlighted(),
      notedSegments: this.getNoted()
    }, this.createReport)
  }

  componentDidMount() {
    if (!this.state.flattenedCss) {
      $('link[rel="stylesheet"]').each(function(index, value){
        $.get($(value).attr('href'), function(data){
          $(value).replaceWith($('<style type="text/css"></style>').text(data))
        }.bind(value))
      })

      this.setState({
        flattenedCss: true
      })
    }
  }

  componentWillUpdate() {
    if (!this.state.hasHighlighted) {
      var highlights = document.getElementsByClassName('issue-highlights')

      for (let i = 0; i < highlights.length; i++) {
        highlights[i].innerHTML = this.fetchHighlights(highlights[i].getAttribute('seg-id'), highlights[i].getAttribute('content-type'), highlights[i].innerHTML)
      }

      this.setState({
        hasHighlighted: true
      })
    }

    if (!this.state.issueReportShown) {
      var reportContainer = document.getElementById('reportContainer')

      reportContainer.innerHTML = this.state.scorecardReport.issueReport

      this.setState({
        issueReportShown: true
      })
    }
  }

  componentDidUpdate() {
    if (this.state.doDownload) {
        this.download()
    }
  }

  getIssues() {
    var issueSegments = {}

    for (let issueSegment of this.state.scorecardReport.issues) {
      let segmentNum = this.state.scorecardReport.key[issueSegment.segment];

      (segmentNum in issueSegments) ?  issueSegments[segmentNum].push(issueSegment) : issueSegments[segmentNum] = [issueSegment]
    }
    return(issueSegments)
  }

  getHighlighted() {
      var highlightedSegments = {}

      for (let highlightedSegment of this.state.scorecardReport.highlights) {
        var segmentNum = this.state.scorecardReport.key[highlightedSegment['segment-id']]
        highlightedSegments[segmentNum] = highlightedSegment
      }
      return(highlightedSegments)
  }

  getNoted() {
      var notedSegments = {}

      for (let notedSegment of this.state.scorecardReport.notes) {
        var segmentNum = this.state.scorecardReport.key[notedSegment['segment-id']]
        notedSegments[segmentNum] = notedSegment
      }

      return(notedSegments)
  }

  rowifyIssues(issuesList) {
    var issueRows = []
    var issueRow = []
    for (let i = 0; i < issuesList.length; i++) {
        if ((i+1) % 4 !== 0) {
          issueRow.push(<span key={'issueMark_'+issueRows.length+'_'+issueRow.length} className='issueMark'>{issuesList[i]}&nbsp;|&nbsp;</span>)
        } else {
          issueRows.push(<div key={'issueMarkRow_'+issueRows.length} className='issueMarkRow'>{issueRow}</div>)
          issueRow = [<span key={'issueMark_'+issueRows.length+'_'+issueRow.length} className='issueMark'>{issuesList[i]}&nbsp;|&nbsp;</span>]
        }
    }
    issueRows.push(<div key={'issueMarkRow_'+issueRows.length} className='issueMarkRow'>{issueRow}</div>)


    return issueRows
  }

  createReport() {
    var rows = []

    var longest = (this.state.sourceSegments.length <= this.state.targetOriginal.length) ?
                    (this.state.targetOriginal.length <= this.state.targetRevised.length) ?
                      this.state.targetRevised.length : this.state.targetOriginal.length : this.state.sourceOriginal.length

    for (let i = 0; i < longest; i++) {
      var sourceText = (i < this.state.sourceSegments.length) ? this.state.sourceSegments[i] : ''
      var targetOriginal = (i < this.state.targetOriginal.length) ? this.state.targetOriginal[i] : ''
      var targetRevised = (i < this.state.targetRevised.length) ? this.state.targetRevised[i] : ''

      var rowBuilder = {
        segmentId: i+1,
        source: this.checkHighlights(i+1, 'source') ? <span seg-id={i+1} content-type='source' className='issue-highlights'>{sourceText}</span> : <span>{sourceText}</span>,
        targetOriginal: this.checkHighlights(i+1, 'target') ? <span seg-id={i+1} content-type='target' className='issue-highlights'>{targetOriginal}</span> : <span>{targetOriginal}</span>,
        targetRevised: this.checkHighlights(i+1, 'target') ? <span seg-id={i+1} content-type='target' className='issue-highlights'>{targetRevised}</span> : <span>{targetRevised}</span>,
        notes: this.fetchNotes(i+1),
        issuesSource: this.fetchIssues(i+1, 'source'),
        issuesTarget: this.fetchIssues(i+1, 'target')
      }
      rows.push(
        <tr key={rowBuilder.segmentId} className='top'>
          <td className='numCol'>{rowBuilder.segmentId}</td>
          <td className='segmentCol'>{rowBuilder.source}</td>
          <td className='segmentCol'>{rowBuilder.targetOriginal}</td>
          <td className='segmentCol'>{rowBuilder.targetRevised}</td>
          <td className='notesCol'>{rowBuilder.notes}</td>
        </tr>
      )
      if (rowBuilder.issuesSource.length > 0 || rowBuilder.issuesTarget.length > 0) {
        rows.push(
          <tr key={rowBuilder.segmentId + '_issuesRow'} className='bottom'>
            <td></td>
            <td className='issuesCell'>{this.rowifyIssues(rowBuilder.issuesSource)}</td>
            <td className='issuesCell'>{this.rowifyIssues(rowBuilder.issuesTarget)}</td>
            <td></td>
            <td></td>
          </tr>
        )
      }
    }
    this.setState({
      report: rows
    })
  }

  fetchIssues(segmentId, type) {
    var issues = []

    if (segmentId.toString() in this.state.issueSegments) {
      for (let segment of this.state.issueSegments[segmentId.toString()]) {
        if (segment.target === type) {
          issues.push(
            <IssueType key={segmentId + '_' + type + '_issuesCol_' + issues.length} style={segment.severity}>
              {segment.name}
            </IssueType>
          )
        }
      }

    }

    return issues
  }

  fetchNotes(segmentId) {
    if (segmentId.toString() in this.state.notedSegments) {
      return this.state.notedSegments[segmentId.toString()].notes
    }

    return ''
  }

  checkHighlights(segmentId, type) {
    if (segmentId.toString() in this.state.highlightedSegments) {
      switch(type) {
        case 'source':
          return (this.state.highlightedSegments[segmentId.toString()].highlights.source.length > 0) ? true : false
        case 'target':
          return (this.state.highlightedSegments[segmentId.toString()].highlights.target.length > 0) ? true : false
        default:
          return false
      }
    }

    return false
  }

  fetchHighlights(segmentId, type, text) {
    for (let highlighted of this.state.highlightedSegments[segmentId].highlights[type]) {
      text = text.replace(new RegExp(highlighted), '<span style="background-color: #FFFF00;">' + highlighted + '</span>')
    }

    return text
  }

  isPrintClicked() {
    this.setState({
      printButton: this.printButton.empty,
      restartButton: this.restartButton.empty,
      doDownload: true
    })
  }

  returnHome() {
    this.props.history.push('/')
  }

  download() {

    $('noscript').text('')

    $('.manualInfo').each(function(index,value){
      $(value).replaceWith($('<span class="manualInfo"></span>').text($(value).val()))
    })

    var content = document.documentElement.outerHTML
    var converted = htmlDocx.asBlob(content, {orientation: 'landscape', margins: {top: 720, right: 65, left: 65}});
    FileSaver.saveAs(converted, 'test.docx');

    this.setState({
      printButton: this.printButton.filled,
      restartButton: this.restartButton.filled,
      doDownload:false
    })

    $('.manualInfo').each(function(index,value){
      $(value).replaceWith($('<input type="text" class="manualInfo"/>').val($(value).text()))
    })
    // window.print()
    // this.props.history.push('/')
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            {this.state.printButton}
            {this.state.restartButton}
          </div>

          <div id='scoreContainer'>
            <p className="headerItem">Date: {Moment().format('D-MM-YYYY')}</p>
            <p className="headerItem">Document name: <input className='manualInfo' type='text'/></p>
            <p className="headerItem">Languange Combination: <input className='manualInfo' type='text'/></p>
            <p className="headerItem">Evaluator: <input className='manualInfo' type='text'/></p>
            <p className="headerItem">Source score: {this.state.scores.sourceScore}</p>
            <p className="headerItem">Target score: {this.state.scores.targetScore}</p>
            <p className="headerItem">Composite score: {this.state.scores.compositeScore}</p>
            <p className="headerItem">Acceptance Status: <span style={{fontWeight: 'bold'}}>{this.state.acceptance}</span></p>
          </div>
          <div id='reportContainer'></div>
          <hr/>
          <table id='segmentsContainer' cellSpacing='0'>
            <thead>
              <tr className='segmentsHeader'>
                <th>#</th>
                <th className="segmentCol">Source</th>
                <th className="segmentCol">Target (Original)</th>
                <th className="segmentCol">Target (Revised)</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {this.state.report}
            </tbody>
          </table>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Report
