import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, Image, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { getAllPurchases } from '../../api/purchaseService';

const EquipmentTypeList = ({ equipmentTypes, onEdit, onDelete, onAdd }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getAllPurchases().then(purchases => {
      const counts = {};
      purchases.forEach(p => {
        const id = p.equipmentType?._id || p.equipmentType;
        counts[id] = (counts[id] || 0) + p.quantity;
      });
      setQuantities(counts);
    }).catch(() => {});
  }, []);

  const columns = [
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Image</span>,
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image width={75} height={40} src={text} alt="Equipment Type" style={{borderRadius: "5px"}} />,
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Name</span>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Category</span>,
      dataIndex: 'category',
      key: 'category',
      render: category => <Tag color={category === "Weapon" ? "volcano" : category === "Vehicle" ? "blue" : category === "Ammunition" ? "red" : "green"}>{category}</Tag>,
      filters: [
        { text: 'Weapon', value: 'Weapon' },
        { text: 'Vehicle', value: 'Vehicle' },
        { text: 'Ammunition', value: 'Ammunition' },
        { text: 'General', value: 'General' },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Quantity</span>,
      key: 'quantity',
      render: (_, record) => {
        const qty = quantities[record._id] || 0;
        return <Tag color={qty === 0 ? "red" : qty < 10 ? "orange" : "green"}>{qty}</Tag>;
      }
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
            title="Are you sure to delete this equipment type?"
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
          Add New Equipment Type
        </Button>
      )}
      <Table
        columns={columns}
        dataSource={equipmentTypes.map(et => ({ ...et, key: et._id }))}
        rowKey="_id"
        scroll={{ x: true }}
      />
    </>
  );
};

export default EquipmentTypeList;