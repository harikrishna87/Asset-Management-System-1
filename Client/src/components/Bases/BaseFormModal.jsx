import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';

const BaseFormModal = ({ visible, onCreate, onUpdate, onCancel, initialData }) => {
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
        console.log('Validate Failed:', info);
        message.error('Please correct the form errors.');
      });
  };

  return (
    <Modal
      visible={visible}
      title={<span style={{color: "#1677FF", fontSize: "18px"}}>{isEditing ? "Edit Base" : "Create New Base"}</span>}
      okText={isEditing ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="base_form">
        <Form.Item
          name="name"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Base Name</span>}
          rules={[{ required: true, message: 'Please input the name of the base!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Location</span>}
          rules={[{ required: true, message: 'Please input the location!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label={<span style={{color: "#1677FF", fontSize: "16px"}}>Image URL (Optional)</span>}
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <Input placeholder="http://example.com/image.png" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BaseFormModal;