import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {CircleNumber, UploadContainer, UploadImage, styles} from '../styled/UploadBlock'

import uploadRed from '../images/upload-icon-red.png'
import uploadYellow from '../images/upload-icon-yellow.png'
import uploadGreen from '../images/upload-icon-green.png'

class UploadBlock extends Component {
  // = (circleNumber, imageColor, buttonLabel)

  state = {
    imageSource: '',
    buttonLabel: '',
    fileTypes: '' //comma delimited list of file types: ".txt, .csv"
  }

  componentWillMount() {
    this.setState({buttonLabel: this.props.buttonLabel, fileTypes: this.props.fileTypes})

    switch(this.props.imageColor) {
      case 'red':
        this.setState({imageSource: uploadRed})
        break
      case 'yellow':
        this.setState({imageSource: uploadYellow})
        break
      case 'green':
      default:
        this.setState({imageSource: uploadGreen})
    }
  }

  upload = (file) => {
    if (this.props.uploadTask(file.target.files[0]))
    {
      this.setState({buttonLabel: file.target.files[0].name.substring(0,24)})
    }
  }

  render () {
    return (
      <UploadContainer>
        <CircleNumber>{this.props.circleNumber}</CircleNumber>
        <UploadImage
          src={this.state.imageSource}
        />
        <RaisedButton
          label={this.state.buttonLabel}
          labelPosition="before"
          style={styles.uploadButton}
          containerElement="label"
        >
          <input type="file" style={styles.exampleImageInput} onChange={this.upload} accept={this.state.fileTypes}/>
        </RaisedButton>
      </UploadContainer>
    )
  }
}

export default UploadBlock
