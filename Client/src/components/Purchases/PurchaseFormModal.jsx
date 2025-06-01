import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Select, InputNumber } from 'antd';
import { getAllBases } from '../../api/baseService';
import { getAllEquipmentTypes } from '../../api/equipmentTypeService.js';

const { Option } = Select;

const PurchaseFormModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingDropdowns(true);
      try {
        const [basesData, eqTypesData] = await Promise.all([
          getAllBases(),
          getAllEquipmentTypes()
        ]);
        setBases(basesData || []);
        setEquipmentTypes(eqTypesData || []);
      } catch (error) {
        message.error("Failed to load data for form dropdowns.");
        console.error("Dropdown fetch error:", error);
      } finally {
        setLoadingDropdowns(false);
      }
    };
    if (visible) {
        fetchData();
    }
  }, [visible]);

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        onCreate(values);
        form.resetFields();
      })
      .catch(info => {
        message.error('Please correct the form errors.');
      });
  };

  return (
    <Modal
      visible={visible}
      title={<span style={{color: "#1677FF", fontSize: "16px"}}>Record New Purchase</span>}
      okText="Record Purchase"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      destroyOnClose
      width={600}
    >
      <Form form={form} layout="vertical" name="purchase_form">
        <Form.Item
          name="baseId"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Base</span>}
          rules={[{ required: true, message: 'Please select the base!' }]}
        >
          <Select placeholder="Select base" loading={loadingDropdowns}>
            {bases.map(base => <Option key={base._id} value={base._id}>{base.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="equipmentTypeId"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Equipment Type</span>}
          rules={[{ required: true, message: 'Please select the equipment type!' }]}
        >
          <Select placeholder="Select equipment type" loading={loadingDropdowns}>
            {equipmentTypes.map(eq => <Option key={eq._id} value={eq._id}>{eq.name} ({eq.category})</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Quantity</span>}
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="supplier"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Supplier (Optional)</span>}
          rules={[{ required: true, message: 'Please mention the Supplier!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cost"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Total Cost (Optional)</span>}
          rules={[{ required: true, message: 'Please mention the Total Cost!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Description / Notes (Optional)</span>}
          
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PurchaseFormModal;