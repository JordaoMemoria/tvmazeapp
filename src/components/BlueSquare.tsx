import React from 'react'
import styles from '../common/styles'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { BlueSquareProps } from '../typescript/interfaces'

export default function BlueSquare({ text, center }: BlueSquareProps) {
  return center ? (
    <CenterBlueView>
      <WhiteText>{text}</WhiteText>
    </CenterBlueView>
  ) : (
    <BlueView>
      <WhiteText>{text}</WhiteText>
    </BlueView>
  )
}

const BlueView = styled.View`
  border-radius: 20px;
  background-color: ${styles.colors.primary};
  padding: 10px;
  margin-left: 10px;
  margin-top: 10px;
  align-self: flex-start;
  max-width: ${Dimensions.get('screen').width - 40}px;
`
const CenterBlueView = styled(BlueView)`
  align-self: center;
`
const WhiteText = styled.Text`
  font-size: ${styles.fonts.big}px;
  align-self: flex-start;
  color: ${styles.colors.background};
`
