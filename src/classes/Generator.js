import React from 'react'

class Generator {

  state = {
    originalReady: false,
    sourceOriginal: [],
    targetOriginal: [],

    revisedReady: false,
    sourceRevised: [], //should be identical to sourceOriginal
    targetRevised: [],

    scorecardReportReady: false,
    scorecardReport: null
  }

  start(originalFile, revisedFile, scorecardReportFile) {
    this.setOriginalContents(originalFile)
    this.setRevisedContents(revisedFile)
    this.setScorecarReportContents(scorecardReportFile)

    while(1){
      if (this.checkcontents()) break
    }
    console.log('returning from Generator.start()')
  }

  checkcontents = function() {
    if (this.state.originalReady && this.state.revisedReady && this.state.scorecardReportReady) {
      this.alignContents()
    } else {
      setTimeout(this.checkcontents, 1000)
    }

    return true
  }.bind(this)

  alignContents() {
    var aligned = true

    if(!this.checkContentMatch(this.state.sourceOriginal, this.state.sourceRevised, 5)) {
      console.log("Sources do not look the same.")
      aligned = false
    }
    if(!this.checkContentMatch(this.state.targetOriginal, this.state.targetRevised)) {
      console.log("Targets do not look the same")
      aligned = false
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
        console.log(max)
        console.log(array1[i].replace(/\s/g, '') + " " + array2[i].replace(/\s/g, '') + " ---> " + distance)
        return false
      }
    }

    return true
  }

  setOriginalContents(file) {
    this.setContents(file, 'original')
  }

  setRevisedContents(file) {
    this.setContents(file, 'revised')
  }

  setScorecarReportContents(file) {
    this.setContents(file, 'scorecardReport')
  }

  setContents(file, type) {
    var reader = new FileReader()
    reader.onload = function (e) {
        var contents = reader.result
        if (contents) {
          if (type === "scorecardReport") {
             this.state.scorecardReport = JSON.parse(contents);
             this.state.scorecardReportReady = true;
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
              this.state.originalReady = true
            } else if (type === "revised") {
              if (columns[0] !== '' && columns[0]) {
                this.state.sourceRevised.push(columns[0])
              }
              if (columns[1] !== '' && columns[1]) {
                this.state.targetRevised.push(columns[1])
              }
              this.state.revisedReady = true
            }
          }
        }
    }.bind(this, type)
    reader.readAsText(file)
  }

  render(){
    return(
      <div>Generating Report...</div>
    )
  }
}

export default Generator
