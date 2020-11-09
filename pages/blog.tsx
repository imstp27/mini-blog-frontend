import { Row, Col, Button, Modal, message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Card, { MyCardProps } from '@components/Card';
import styled from 'styled-components';
import withAuth from 'providers/withAuth';
import { addNewCardAPI, editCardAPI, daleteCardAPI, fetchAllCardsAPI } from '@api/cards';
import { NextPage } from 'next';
import Cookies from 'cookies';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CardForm } from '@components/CardForm';
import cookieCutter from 'cookie-cutter';
import StackGrid from 'react-stack-grid';

const { confirm } = Modal;

interface ICard {
  user: string;
  token: string;
}

const Blog: NextPage<ICard> = ({ user, token }) => {
  const [visible, setVisible] = useState(false);
  const [cards, setCards] = useState<MyCardProps[]>([]);
  const [editData, setEditData] = useState<MyCardProps | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true)
    fetchAllCardsAPI(token).then((response) => {
      const cards = response.data;
      setCards(cards);
      setLoading(false)
    });
  }
    

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (values: any, isEdit: boolean) => {
    setVisible(false);
    if (isEdit) {
      editCardAPI(token, editData._id, values)
        .then(() => message.success('Successfully edited a card.'))
        .catch(() => message.error('Error! something went wrong, please try again.'))
        .finally(() => fetchData());
      setEditData(null);
    } else
      await addNewCardAPI(token, values)
        .then(() => message.success('Successfully add a new card.'))
        .catch(() => message.error('Error! something went wrong, please try again.'))
        .finally(() => fetchData());
  };

  const onEdit = (item: MyCardProps) => {
    setEditData(item);
    setVisible(true);
  };

  const onDelete = async (_id: string) => {
    confirm({
      title: 'Are you sure delete this card?',
      icon: <ExclamationCircleOutlined />,
      content: 'you wont get this card back',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        daleteCardAPI(token, _id)
          .then(() => message.success('Successfully deleted a card.'))
          .catch(() => message.error('Error! something went wrong, please try again.'))
          .finally(() => fetchData());
      },
      onCancel() {},
    });
  };

  return (
    <Container justify="center">
      <Col sm={20} md={16} lg={12}>
        {!loading && (
          <StackGrid gutterWidth={16} gutterHeight={16} columnWidth="50%">
            {cards.map((item, key) => (
              <Card key={key} {...item} user={user} onEdit={() => onEdit(item)} onDelete={() => onDelete(item._id)} />
            ))}
          </StackGrid>
        )}
        { cards.length === 0 && <Typography style={{ textAlign: 'center' }}>It's empty, click (+) button to add some cards.</Typography>}
      </Col>
      <ButtonFloat
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="large"
        onClick={() => setVisible(true)}
      />
      <Modal title="Add a new card" centered visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <CardForm onSubmit={onSubmit} editData={editData} />
      </Modal>
    </Container>
  );
};

Blog.getInitialProps = async ({ req, res }) => {
  if (!!req) {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');
    const user = cookies.get('user');
    return { user, token };
  } else {
    const token = cookieCutter.get('token');
    const user = cookieCutter.get('user');
    return { user, token };
  }
};

const Container = styled(Row)`
  min-height: 100vh;
  padding: 2em;
  background-color: #eaeaea;
  position: relative;
`;

const ButtonFloat = styled(Button)`
  position: fixed;
  right: 2em;
  bottom: 2em;
`;

export default withAuth(Blog);
