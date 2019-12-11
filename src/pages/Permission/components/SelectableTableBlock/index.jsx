import React, { useState, useEffect } from 'react';
import { Table, Button, Icon, Pagination, Balloon, Select} from '@alifd/next';
import IceContainer from '@icedesign/container';
import { request } from '@/utils/request';
import { roleList, assignRole } from '@/config/dataSource';
import styles from './index.module.scss';

// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么
export default function SelectableTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [roles, setRoles] = useState([]);
  
  useEffect(() => {
    props.fetchData();
    getRoles();
  }, []);

  async function getRoles() {
    const list = [];
    const { data } = await request(roleList);
    data.data.list.forEach(element => {
      list.push({'label': element.name.concat('(', element.guard_name, ')'), 'value': element.id});
    });
    setRoles(list);
  }

  async function assignRoles(value, index) {
    console.log('value ', value);
    console.log('index ', index);
    const permissionId = props.dataSource[index].id;
    console.log('id ', permissionId);

    const uris = assignRole.url.split('/');
    console.log('uris', uris);

    uris[3] = permissionId;
    uris[4] = value;
    assignRole.url = uris.join('/');
    console.log('url', assignRole.url);
    const { data } = await request(assignRole);
    if (data.code === 0) {
      console.log('success');
    }
  }

  const createPermission = () => {
    props.setVisible(true);
  };

  const pageChange = function(value) {
    console.log(value);
    props.fetchData(value);
  };

  // 表格可以勾选配置项
  const rowSelection = {
    // 表格发生勾选状态变化时触发
    onChange: (ids) => {
      console.log('ids', ids);
      setSelectedRowKeys(ids);
    },
    // 全选表格时触发的回调
    onSelectAll: (selected, records) => {
      console.log('onSelectAll', selected, records);
    },
    // 支持针对特殊行进行定制
    getProps: (record) => {
      return {
        disabled: record.id === 100306660941,
      };
    },
  };

  const clearSelectedKeys = () => {
    setSelectedRowKeys([]);
  };

  const deleteSelectedKeys = () => {
    console.log('delete keys', selectedRowKeys);
  };

  const deleteItem = (value, record) => {
    console.log('value', record);
    console.log('delete item', record);
    const { id } = record;
    console.log('delete item', id);
  };

  const showSelect = <Button className="btrigger">授权</Button>;

  const renderOperator = (value, index, record) => {
    return (
      <div>
        <Balloon type="primary" autoFocus trigger={showSelect} closable={false} triggerType="click">
          <Select placeholder="请选择" dataSource={roles} followTrigger onChange={(e) => assignRoles(e, index)} />
        </Balloon>
        <Button
          className={styles.removeBtn}
          onClick={(e) => deleteItem(e, record)}
        >
          删除
        </Button>
      </div>
    );
  };

  return (
    <div className={`${styles.selectableTable} selectable-table`} >
      <IceContainer className={styles.IceContainer}>
        <div>
          <Button
           size="small" 
           className={styles.batchBtn} 
           onClick={createPermission}
          >
            <Icon type="add" />增加
          </Button>
          <Button
            onClick={deleteSelectedKeys}
            size="small"
            className={styles.batchBtn}
            disabled={!selectedRowKeys.length}
          >
            <Icon type="ashbin" />删除
          </Button>
          <Button
            onClick={clearSelectedKeys}
            size="small"
            className={styles.batchBtn}
          >
            <Icon type="close" />清空选中
          </Button>
        </div>
        <div>
          <a href="/" download>
            <Icon size="small" type="download" /> 导出表格数据到 .csv 文件
          </a>
        </div>
      </IceContainer>
      <IceContainer>
        <Table
          dataSource={props.dataSource}
          loading={props.isLoading}
          rowSelection={{
            ...rowSelection,
            selectedRowKeys,
          }}
        >
          <Table.Column title="编号" dataIndex="id" width={120} />
          <Table.Column title="名称" dataIndex="name" width={350} />
          <Table.Column title="门户" dataIndex="guard_name" width={160} />
          <Table.Column title="创建时间" dataIndex="created_at" width={160} />
          <Table.Column title="修改时间" dataIndex="updated_at" width={120} />
          <Table.Column
            title="操作"
            cell={renderOperator}
            lock="right"
            width={120}
          />
        </Table>
        <div className={styles.pagination}>
          <Pagination size="medium" onChange={pageChange} total={props.total} totalRender={total => `Total: ${total}`} />
        </div>
      </IceContainer>
    </div>
  );
}
