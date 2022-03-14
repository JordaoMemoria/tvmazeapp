import React from 'react';
import styles from '../common/styles';
import styled from 'styled-components/native';
import {RowSettingsProps} from '../typescript/interfaces';

export default function RowSettings({
  text,
  activated,
  onChange,
}: RowSettingsProps) {
  return (
    <Row>
      <TextButton>{text}</TextButton>
      <Switch
        value={activated}
        trackColor={{true: styles.colors.primary}}
        thumbColor={styles.colors.background}
        onValueChange={(newValue: boolean) => {
          onChange(newValue);
        }}
      />
    </Row>
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
  padding-right: 20px;
`;
const Switch = styled.Switch``;
