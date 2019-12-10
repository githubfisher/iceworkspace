import React, { useState } from 'react';
import { request } from '@/utils/request';
import { permissionList } from '@/config/dataSource';
import SelectableTableBlock from './components/SelectableTableBlock';
import OverLay from './components/OverLay';

export default function ProjectList() {
  const [isVisible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  async function getPermissions(page) 
  {
    let list = [];
    permissionList.params = {'page': page};
    const { data } = await request(permissionList);
    list = data.data.list;

    return { list };
  }
  
  async function fetchData(page = 1) {
    setLoading(true);
    const { list } = await getPermissions(page);
    setDataSource(Array.from(list.data));
    setTotal(list.total);
    setLoading(false);
  }

  return (
    <div>
      <SelectableTableBlock 
        setVisible={setVisible} 
        fetchData={fetchData} 
        isLoading={isLoading}
        dataSource={dataSource}
        total={total}
      />
      <OverLay 
        isVisible={isVisible} 
        setVisible={setVisible} 
        fetchData={fetchData} 
      />
    </div>
  );
}
