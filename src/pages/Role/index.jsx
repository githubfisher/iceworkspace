import React, { useState } from 'react';
import { request } from '@/utils/request';
import { roleList } from '@/config/dataSource';
import SelectableTableBlock from './components/SelectableTableBlock';

export default function ProjectList() {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function getRole() {
    let list = [];
    const { data } = await request(roleList);
    list = Array.from(data.data.list);

    return { list };
  }
  
  async function fetchData() {
    setLoading(true);
    const { list } = await getRole();
    setDataSource(list);
    setLoading(false);
  }

  return (
    <div>
      <SelectableTableBlock 
        fetchData={fetchData} 
        isLoading={isLoading}
        dataSource={dataSource}
      />
    </div>
  );
}