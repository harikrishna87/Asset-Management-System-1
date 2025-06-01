import React from 'react';
import { Table, Tag, Tooltip, Avatar } from 'antd';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

const UserList = ({ users }) => {
  const columns = [
    {
      title: <span style={{ color: "#1677FF", fontSize: "16px" }}>Image</span>,
      dataIndex: 'image',
      key: 'image',
      render: (imageUrl) => (
        <Avatar
          src={imageUrl}
          icon={!imageUrl && <UserOutlined />}
          size={50}
          style={{ 
            cursor: 'pointer'
           }}
        />
      )
    },
    {
      title: <span style={{ color: "#1677FF", fontSize: "16px" }}>Username</span>,
      dataIndex: 'username',
      key: 'username',
      render: text => <><UserOutlined style={{ marginRight: 8 }} />{text}</>,
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: <span style={{ color: "#1677FF", fontSize: "16px" }}>Role</span>,
      dataIndex: 'role',
      key: 'role',
      render: role => {
        let color = 'purple';
        if (role === 'Admin') color = 'red';
        else if (role === 'BaseCommander') color = 'green';
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'BaseCommander', value: 'BaseCommander' },
        { text: 'LogOfficer', value: 'LogOfficer' },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: <span style={{ color: "#1677FF", fontSize: "16px" }}>AssignedBase</span>,
      dataIndex: 'assignedBase',
      key: 'assignedBase',
      render: base => base ? (
        <Tooltip title={base.location} >
          <HomeOutlined style={{ marginRight: 8 }} />{base.name}
        </Tooltip>
      ) : <Tag color='blue'>N/A</Tag>,
      sorter: (a, b) => (a.assignedBase?.name || '').localeCompare(b.assignedBase?.name || '')
    },
    {
      title: <span style={{ color: "#1677FF", fontSize: "16px" }}>Joined</span>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users.map(user => ({ ...user, key: user._id }))}
      rowKey="_id"
      scroll={{ x: true }}
    />
  );
};

export default UserList;