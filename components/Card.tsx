import { Card, Row, Col, Typography, Avatar } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Icon, { DeleteFilled, EditOutlined, HeartFilled } from '@ant-design/icons';
import { CircleOutlined } from '@components/icons';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

export interface MyCardProps {
  _id: string;
  name: string;
  status: string;
  category: string;
  content: string;
  author: { _id: string; name: string; image: string };
  createdOn: string;
  user: string;
  onEdit: () => void;
  onDelete: () => void;
}
const statusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'green';
    case 'publish':
      return 'lightblue';
    case 'draft':
      return 'purple';
    case 'banned':
      return 'yellow';
  }
};

const rand = () => Math.floor(Math.random() * 100) + 1;

const MyCard = (props: MyCardProps) => (
  <CardStyled>
    <Row justify="space-between" align="middle">
      <Col>
        <Title level={5}>{props.category}</Title>
      </Col>
      <Col>
        <Icon component={CircleOutlined} style={{ fill: statusColor(props.status) }} />
        {props.user === props.author._id ? <EditOutlined style={{ marginLeft: '.5em' }} onClick={props.onEdit} /> : null}
        {props.user === props.author._id ? (
          <DeleteFilled style={{ marginLeft: '.5em', color: '#D04848' }} onClick={props.onDelete} />
        ) : null}
      </Col>
    </Row>
    <Typography>{props.content}</Typography>
    <DivStyled>
      <HeartFilled color="grey" />
      <span>
        <b>{rand()}</b>
      </span>
      <span>|</span>
      <span>
        <b>{rand()}</b> comments
      </span>
    </DivStyled>
    <Meta
      avatar={<Avatar src={props.author.image} />}
      title={props.author.name}
      description={moment(props.createdOn).fromNow()}
    />
  </CardStyled>
);

const CardStyled = styled(Card)`
  h5.ant-typography {
    text-transform: uppercase !important;
    color: rgb(171, 79, 208) !important;
    font-size: 12px !important;
  }
  article.ant-typography {
    color: rgb(125 125 125 / 85%) !important;
    font-size: 18px !important;
    margin-bottom: 0.5em !important;
  }
  .ant-card-meta-title {
    margin-bottom: 0px !important;
    font-size: 14px !important;
  }
  .ant-card-meta-description {
    font-size: 12px !important;
  }
`;

const DivStyled = styled.div`
  margin-bottom: 2em;
  span {
    color: #857c8d;
    margin-right: 0.5em;
  }
`;

export default MyCard;
