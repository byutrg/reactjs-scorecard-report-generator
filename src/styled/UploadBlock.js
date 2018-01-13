import React from 'react'
import styled from 'styled-components'

export const styles = {
  uploadButton: {
    width: '85%',
    margin: '20px 0px 20px 20px',
    'border-radius': 5
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

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
`
export const UploadContainer = styled.div`
  display: inline-block;
  width: 310px;
  height: 429px;
  padding: 1px;
`

export const UploadImage = styled.img`
  display: block;
  margin: 0 auto;
`
