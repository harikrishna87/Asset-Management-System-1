import React from 'react';
import { Table, Button, Tag, Tooltip } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const PurchaseList = ({ purchases, onAdd }) => {
  const { user } = useAuth();
  const canAddPurchase = user?.role === 'Admin' || user?.role === 'LogOfficer';

  const columns = [
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Base</span>,
      dataIndex: 'base',
      key: 'base',
      render: base => base?.name || 'N/A',
      sorter: (a, b) => a.base?.name.localeCompare(b.base?.name),
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>EquipmentType</span>,
      dataIndex: 'equipmentType',
      key: 'equipmentType',
      render: eq => eq?.name || 'N/A',
      sorter: (a, b) => a.equipmentType?.name.localeCompare(b.equipmentType?.name),
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Category</span>,
      dataIndex: ['equipmentType', 'category'],
      key: 'category',
      render: category => <Tag color={category === "Weapon" ? "volcano" : category === "Vehicle" ? "blue" : category === "Ammunition" ? "red" : "green"}>{category}</Tag>
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Quantity</span>,
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Cost</span>,
      dataIndex: 'cost',
      key: 'cost',
      render: cost => cost ? `₹ ${cost.toLocaleString()}` : 'N/A',
      sorter: (a, b) => (a.cost || 0) - (b.cost || 0),
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Supplier</span>,
      dataIndex: 'supplier',
      key: 'supplier',
      render: supplier => supplier || <Tag>Unknown</Tag>,
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>PurchaseDate</span>,
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>RecordedBy</span>,
      dataIndex: 'recordedBy',
      key: 'recordedBy',
      render: recBy => (
        <Tooltip title={recBy?.username || 'Unknown User'}>
          <UserOutlined /> {recBy?.username.substring(0,10) || 'N/A'}
          {recBy?.username.length > 10 && '...'}
        </Tooltip>
      ),
    },
    {
      title: <span style={{color: "#1677FF", fontSize: "16px"}}>Description / Notes</span>,
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (desc) => desc ? (
        <span style={{
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "150px"
        }}>{desc}</span>
      ) : (<Tag color='valcano'>No Description</Tag>),
    },
  ];

  return (
    <>
      {canAddPurchase && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
          style={{ marginBottom: 16 }}
        >
          Record New Purchase
        </Button>
      )}
      <Table
        columns={columns}
        dataSource={purchases.map(p => ({ ...p, key: p._id }))}
        rowKey="_id"
        scroll={{ x: true }}
      />
    </>
  );
};

export default PurchaseList;