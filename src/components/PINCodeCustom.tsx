import React from 'react';
import styles from '../common/styles';
import PINCode from '@haskkor/react-native-pincode';
import {PinCodeProps} from '../typescript/interfaces';

export default function PINCodeCustom({mode, pincode, onFinish}: PinCodeProps) {
  return (
    <PINCode
      status={mode}
      touchIDDisabled={true}
      maxAttempts={5000}
      timeLocked={10}
      storedPin={pincode}
      finishProcess={(code: any) => onFinish(code)}
      colorPassword={styles.colors.primary}
      numbersButtonOverlayColor={styles.colors.primary}
      colorCircleButtons={styles.colors.background}
      stylePinCodeButtonNumber={styles.colors.secondary}
      stylePinCodeButtonNumberPressed={styles.colors.background}
      stylePinCodeCircle={{borderColor: styles.colors.primary, borderWidth: 1}}
      buttonDeleteText=""
      styleLockScreenTitle={{opacity: 1, fontWeight: 'bold'}}
      stylePinCodeTextSubtitle={{fontWeight: 'bold'}}
      stylePinCodeTextTitle={{fontWeight: 'bold'}}
      stylePinCodeDeleteButtonColorHideUnderlay={styles.colors.secondary}
      stylePinCodeDeleteButtonColorShowUnderlay={styles.colors.primary}
    />
  );
}
