import React, { useState, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { permissionCreate } from '@/config/dataSource';
import { request } from '@/utils/request';

import styles from './index.module.scss';

const { Row, Col } = Grid;
export default function UserForm(props) {
  const formRef = useRef(null);
  const [value, setValue] = useState({
    name: '',
    guard: null,
  });
  let isValidateFail = false;

  const formChange = () => {
     setValue(value);
  };

  const validateAllFormField = () => {
    formRef.current.validateAll((errors, values) => {
      console.log('values', values);
      if (errors.length > 0) {
        isValidateFail = true;
      }
    });
  };

  async function crePermission() {
    validateAllFormField();
    if (isValidateFail) {
      return;
    }

    try {
      permissionCreate.data = value;
      console.log('permissionCreate ', permissionCreate);
      const { data } = await request(permissionCreate);
      if (data.code === 0) {
        console.log('success');
        props.setVisible(false);
        props.fetchData();
      }
    } catch(err) {
      console.error('error', err);
    }
  }

  return (
    <div className="user-form">
      <IceContainer>
        <IceFormBinderWrapper
          value={value}
          onChange={formChange}
          ref={formRef}
        >
          <div className={styles.formContent}>
            <h2 className={styles.formTitle}>添加权限</h2>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                权限名称：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="name" required message="必填">
                  <Input
                    size="large"
                    placeholder="请输入权限名称"
                    className={ styles.userName}
                  />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                门户：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="guard">
                  <Select
                    className={styles.chooseMan}
                    size="large"
                    placeholder="请选择..."
                    dataSource={[
                      { label: '用户', value: 'user' },
                      { label: '管理员', value: 'admin' },
                      { label: '运营', value: 'operator' },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>

        <Row>
          <Col offset="3">
            <Button
              size="large"
              type="primary"
              onClick={crePermission}
            >
              提 交
            </Button>
          </Col>
        </Row>
      </IceContainer>
    </div>
  );
}
