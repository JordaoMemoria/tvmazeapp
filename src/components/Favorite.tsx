import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import styles from '../common/styles';
import {FavProps} from '../typescript/interfaces';

export default function Favorite({onValueChange, value, absolute}: FavProps) {
  const buttonClicked = () => {
    onValueChange(!value);
  };

  let iconName: any = value ? 'heart' : 'heart-outline';
  return absolute ? (
    <ButtonAbsolute onPress={buttonClicked}>
      <Container>
        <Ionicons name={iconName} size={30} color={styles.colors.primary} />
      </Container>
    </ButtonAbsolute>
  ) : (
    <Button onPress={buttonClicked}>
      <Container>
        <Ionicons name={iconName} size={30} color={styles.colors.primary} />
      </Container>
    </Button>
  );
}

const Container = styled.View`
  height: 44px;
  width: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: ${styles.colors.background};
`;
const ButtonAbsolute = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const Button = styled.TouchableOpacity``;
