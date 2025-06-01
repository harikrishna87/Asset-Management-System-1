import React from 'react';
import { Table, Button, Space, Popconfirm, Image, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const BaseList = ({ bases, onEdit, onDelete, onAdd }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const columns = [
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Image</span>,
      dataIndex: 'image',
      key: 'image',
      color: "", 
      render: (text) => text ? <Image width={75} height={40} src={text} alt="Base" style={{borderRadius: "5px"}}/> : <Tag>No Image</Tag>,
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Name</span>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Location</span>,
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>CreatedAt</span>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  if (isAdmin) {
    columns.push({
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Actions</span>,
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this base?"
            onConfirm={() => onDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    });
  }

  return (
    <>
      {isAdmin && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Base
        </Button>
      )}
      <Table
        columns={columns}
        dataSource={bases.map(base => ({ ...base, key: base._id }))}
        rowKey="_id"
        scroll={{ x: true }}
      />
    </>
  );
};

export default BaseList;