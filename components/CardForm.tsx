import { Button, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { MyCardProps } from './Card';

const { Option } = Select;

export interface CardFormProps {
  onSubmit: (values: any, isEdit: boolean) => void;
  editData: MyCardProps | null;
}

export const CardForm = (props: CardFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    props.onSubmit(values, !!props.editData);
  };

  useEffect(() => {
    if (props.editData) {
      form.setFieldsValue({
        name: props.editData.name,
        status: props.editData.status,
        content: props.editData.content,
        category: props.editData.category,
      });
    } else form.resetFields();
  }, [props.editData]);

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="card name" />
      </Form.Item>
      <Form.Item name="status" rules={[{ required: true }]}>
        <Select placeholder="Select a status" allowClear>
          <Option value="new">New</Option>
          <Option value="publish">Publish</Option>
          <Option value="draft">Draft</Option>
          <Option value="banned">Banned</Option>
        </Select>
      </Form.Item>
      <Form.Item name="content" rules={[{ required: true }]}>
        <Input.TextArea placeholder="content" />
      </Form.Item>
      <Form.Item name="category" rules={[{ required: true }]}>
        <Select placeholder="Select a category" allowClear>
          <Option value="biology">Biology</Option>
          <Option value="finance">Finance</Option>
          <Option value="chemistry">Chemistry</Option>
          <Option value="engineering">Engineering</Option>
          <Option value="health">Health</Option>
          <Option value="sociology">Sociology</Option>
          <Option value="space">Space</Option>
          <Option value="art">Art</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button id="submit" type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
