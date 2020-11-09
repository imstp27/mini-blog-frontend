import { Form, Input, Button, Card, Row, Col, Typography } from 'antd';
import { useAuth } from 'providers/Auth';
import React from 'react';
import styled from 'styled-components';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import withoutAuth from 'providers/withoutAuth';
import { loginAPI } from '@api/auth';

const { Title } = Typography;

const Login = () => {
  const { setAuthenticated } = useAuth();
  const router = useRouter();
  const onFinish = async (values: { username: string; password: string }) => {
    const { username, password } = values;
    const response = await loginAPI({ username, password });
    if (response.status === 201) {
      const user = response.data;
      cookieCutter.set('token', user?.accessToken, { expires: user?.expiresIn });
      cookieCutter.set('user', user?._id, { expires: user?.expiresIn });
      setAuthenticated(true);
      router.push('/blog');
    } else {
      console.error('Login error', response);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container justify="center" align="middle">
      <Col sm={16} md={12} lg={6}>
        <Card>
          <Title level={2}>Sign in</Title>
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="username" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Container>
  );
};

const Container = styled(Row)`
  height: 100vh;
  background-color: #eaeaea;
`;

export default withoutAuth(Login);
