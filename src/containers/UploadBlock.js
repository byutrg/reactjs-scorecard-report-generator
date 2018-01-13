import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {CircleNumber, UploadContainer, UploadImage, styles} from '../styled/UploadBlock'

import uploadRed from '../images/upload-icon-red.png'
import uploadYellow from '../images/upload-icon-yellow.png'
import uploadGreen from '../images/upload-icon-green.png'

const UploadButton = ({buttonLabel}) => (
  <RaisedButton
    label={buttonLabel}
    labelPosition="before"
    style={styles.uploadButton}
    containerElement="label"
  >
    <input type="file" style={styles.exampleImageInput} />
  </RaisedButton>
)

// export const UploadBlock = ({circleNumber, imageColor, buttonLabel}) => {
class UploadBlock extends Component {
  // = (circleNumber, imageColor, buttonLabel)

  state = {
    imageSource: ''
  }

  componentWillMount(imageColor = this.props.imageColor) {
    switch(imageColor) {
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

  render (circleNumber = this.props.circleNumber, buttonLabel = this.props.buttonLabel) {
    return (
      <UploadContainer>
        <CircleNumber>{circleNumber}</CircleNumber>
        <UploadImage
          src={this.state.imageSource}
        />
        <UploadButton
          buttonLabel={buttonLabel}
        />
      </UploadContainer>
    )
  }
}

export default UploadBlock
