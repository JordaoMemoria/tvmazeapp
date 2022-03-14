import React from 'react'
import styles from '../common/styles'
import styled from 'styled-components/native'
import { WhiteSquareProps } from '../typescript/interfaces'

export default function WhiteSquare({ text, absolute }: WhiteSquareProps) {
  return absolute ? (
    <AbsoluteWhiteView>
      <Text>{text}</Text>
    </AbsoluteWhiteView>
  ) : (
    <RelativeWhiteView>
      <Text>{text}</Text>
    </RelativeWhiteView>
  )
}

const Text = styled.Text`
  font-size: ${styles.fonts.big}px;
  text-align: justify;
`
const WhiteView = styled.View`
  border-radius: 20px;
  background-color: ${styles.colors.background};
  border-width: 1px;
  border-color: ${styles.colors.primary};
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
`
const RelativeWhiteView = styled(WhiteView)`
  margin-left: 10px;
`

const AbsoluteWhiteView = styled(WhiteView)`
  position: absolute;
  bottom: 0;
  left: 0;
`
