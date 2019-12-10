import React from 'react';
import { Overlay } from '@alifd/next';
import UserFormBlock from '../UserFormBlock';
import styles from './index.module.scss';

export default function CustomTable(props) {
    function closeDown() {
        console.log('disable');
    }

    return (
      <div>
        <Overlay visible={props.isVisible}
          align="cc cc"
          disableScroll
          hasMask
          onRequestClose={closeDown}
        >
          <div className={styles.overlayContainer}>
            <UserFormBlock setVisible={props.setVisible} fetchData={props.fetchData} />
          </div>
        </Overlay>
      </div>
    );
}