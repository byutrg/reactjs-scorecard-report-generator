import React, {Component} from 'react'
import {styles} from '../styled/IssueType'

class IssueType extends Component {

  constructor(props) {
    super(props)

    this.state = {
      style: this.getStyle(),
    }
  }

  getStyle() {
    switch(this.props.style) {
      case 'minor':
        return styles.minor
      case 'major':
        return styles.major
      case 'critical':
        return styles.critical
      default:
        return styles.minor
    }
  }

  render() {
    return(
      <span
        style={this.state.style}
      >
        {this.props.children}
      </span>
    )
  }
}

export default IssueType
