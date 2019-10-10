import React from 'react';
import { Grid } from '@alifd/next';
import Footer from './components/Footer';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default function WelcomeLayout(props) {
  return (
    <div className={styles.container}>
      {props.children}
      <Footer />
    </div>
  );
}