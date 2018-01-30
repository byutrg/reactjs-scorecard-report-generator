import React from 'react'
import styled from 'styled-components'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export const styles = {
  submitButton: {
    display: 'block',
    width: 409,
    height: 106,
    color: 'white',

    borderRadius: 5,
    margin: '0 auto',
    position: 'relative',
    bottom: 20
  },

  radioGroup: {
    width: 40,
    margin: '0 auto',
    position: 'relative',
    left: -25,
    bottom: 115
  }
}

export const CircleNumber = styled.div`
  height: 57px;
  width: 57px;
  border-radius: 100px;
  background-color: rgba(0,166,255,100);
  font-color: white;
  text-align: center;
  line-height: 60px;
  font-size: 45px;
  color: white;
  position: relative;
  left: 320px;
  bottom: 140px;
`

export const RadioGroup = ({circleNumber, selected, callback}) => (
  <div>
    <CircleNumber>{circleNumber}</CircleNumber>
    <RadioButtonGroup name="acceptance" defaultSelected={selected} onChange={callback} style={styles.radioGroup}>
        <RadioButton
          value={'Acceptable'}
          label="Acceptable"
        />
        <RadioButton
          value={'Unacceptable'}
          label="Unacceptable"
        />
      </RadioButtonGroup>
    </div>
)

export const Container = styled.div`
  margin: 30px auto;
  width: 1174px;
  height: 713px;
  background-color: #CFEEFF;
  border: 1px solid rgba(162,146,166,100);
  border-radius: 51px;
  position: relative;
`

export const TopContainer = styled.div`
  margin: 60px auto;
  margin-bottom: 0;
  width: 80%;
`
