import React, { useEffect } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';

const { Option } = Select;

const EquipmentTypeFormModal = ({ visible, onCreate, onUpdate, onCancel, initialData }) => {
  const [form] = Form.useForm();
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        if (isEditing) {
          onUpdate(initialData._id, values);
        } else {
          onCreate(values);
        }
        form.resetFields();
      })
      .catch(info => {
        message.error('Please correct the form errors.');
      });
  };

  return (
    <Modal
      visible={visible}
      title={<span style={{color: "#1677FF", fontSize: "18px"}}>{isEditing ? "Edit Equipment Type" : "Create New Equipment Type"}</span>}
      okText={isEditing ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="equipment_type_form">
        <Form.Item
          name="name"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Equipment Name</span>}
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Category</span>}
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select category">
            <Option value="Weapon">Weapon</Option>
            <Option value="Vehicle">Vehicle</Option>
            <Option value="Ammunition">Ammunition</Option>
            <Option value="General">General</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="image"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Image URL</span>}
          rules={[
            { required: true, message: 'Please input the image URL!' },
            { type: 'url', message: 'Please enter a valid URL' }
          ]}
        >
          <Input placeholder="http://example.com/image.png" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EquipmentTypeFormModal;