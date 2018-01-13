import React, {Component} from 'react'
import {Canvas} from '../styled/Title'

class Title extends Component {

  render () {

    return (
        <Canvas>
          {this.props.children}
        </Canvas>
    )
  }

}

export default Title
