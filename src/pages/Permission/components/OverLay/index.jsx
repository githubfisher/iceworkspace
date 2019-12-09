import React, { useState } from 'react';
import { Button, Overlay } from '@alifd/next';
import UserFormBlock from '../UserFormBlock';
import styles from './index.module.scss';

export default function CustomTable() {
    const [isVisible, setVisible] = useState(false);

    function clickUp() {
        console.log('show');
        setVisible(true);
    }

    function closeDown() {
        console.log('disable');
    }

    return (
      <div>
        <Button onClick={clickUp}>
          Open
        </Button>
        <Overlay visible={isVisible}
          align="cc cc"
          disableScroll
          hasMask
          canCloseByMask
          onRequestClose={closeDown}>
          <div className={styles.overlayContainer}>
            <UserFormBlock />
          </div>
        </Overlay>
      </div>
    );
}