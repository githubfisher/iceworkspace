import React from 'react';
import Layout from '@icedesign/layout';
import Footer from './components/Footer';
import styles from './index.module.scss';

export default function UserLayout(props) {
  return (
    <Layout className={styles.userLayout}>
      {props.children}
      <Footer />
    </Layout>
  );
}
