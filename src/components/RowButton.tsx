import React from 'react';
import styles from '../common/styles';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {RowButtonProps} from '../typescript/interfaces';

export default function RowButton({text, onClick}: RowButtonProps) {
  return (
    <Button onPress={onClick}>
      <Row>
        <TextButton>{text}</TextButton>
        <Entypo name="chevron-right" size={30} color={styles.colors.primary} />
      </Row>
    </Button>
  );
}

const TextButton = styled.Text`
  font-size: ${styles.fonts.big}px;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Row = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  background-color: ${styles.colors.background};
  border-color: ${styles.colors.background_secondary};
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
`;

const Button = styled.TouchableOpacity``;
