import React, {Component} from 'react'
import {Container, TopContainer, styles} from '../styled/ScorecardReportsGenerator'
import RaisedButton from 'material-ui/RaisedButton'
import UploadBlock from '../containers/UploadBlock'

const ScorecardReportsGenerator = () => (
  <Container>
    <TopContainer>
      <UploadBlock
        circleNumber='1'
        imageColor='red'
        buttonLabel="Upload original Bitext"
      />
      <UploadBlock
        circleNumber='2'
        imageColor='yellow'
        buttonLabel="Upload revised Bitext"
      />
      <UploadBlock
        circleNumber='3'
        imageColor='green'
        buttonLabel="Upload Scorecard results"
      />
    </TopContainer>
    <RaisedButton
      label="Generate Report"
      labelStyle={{ 'font-size': 32 }}
      labelPosition="before"
      style={styles.submitButton}
      containerElement="label"
      />
  </Container>
)

export default ScorecardReportsGenerator
