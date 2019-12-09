import React, { useState, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import request from '@/utils/request';

import styles from './index.module.scss';
import { permissionCreate } from '@/config/dataSource';

const { Row, Col } = Grid;
export default function UserForm() {
  const formRef = useRef(null);
  const [value, setValue] = useState({
    name: '',
    guard: null,
  });

  const formChange = () => {
     setValue(value);
  };

  const validateAllFormField = () => {
    formRef.current.validateAll((errors, values) => {
      console.log('values', values);
    });
  };

  async function createPermission() {
    validateAllFormField();

    try {
      permissionCreate.data = value;
      console.log('permissionCreate ', permissionCreate);
      const { data } = await request(permissionCreate);
      if (data.code === 0) {
        console.log('success');
      }
    } catch(err) {
      console.error('error', err);
    }

    console.log('fail');
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
              onClick={createPermission}
            >
              提 交
            </Button>
          </Col>
        </Row>
      </IceContainer>
    </div>
  );
}
