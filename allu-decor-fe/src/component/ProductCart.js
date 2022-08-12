import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Typography } from 'antd';

import { createInvoice } from '../feature/invoice/InvoiceSlice';

import CartItem from './CartItem';

const { Title } = Typography;

export const InvoiceStatus = {
  REQUEST_RECEIVED: 'Request Received',
  REJECTED: 'Rejected',
  ACCEPTED: 'Accepted',
  PAYMENT_RECEIVED: 'Payment Received',
  SERVICE_BEGAN: 'Service Began',
  SERVICE_COMPLETE: 'Service Complete',
};

const ProductCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const user = useSelector((state) => state.userReducer.user);

  const handleCreateInvoice = () => {
    const createat = new Date().toISOString();
    const status = InvoiceStatus.REQUEST_RECEIVED;
    const userid = localStorage.getItem('userid');

    let totalprice = 0;
    cartItems.map((item) => (totalprice += parseInt(item.totalprice)));

    dispatch(createInvoice({ createat, status, totalprice, userid, cartItems }));
  };

  return (
    <Row>
      <Col span={24}>
        <Title
          level={2}
          style={{
            marginLeft: '16rem',
            marginTop: '4rem',
            color: '#076678',
            fontSize: '4rem',
            fontWeight: 'bolder',
            textAlign: 'left',
            textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
          }}
        >
          Order List
        </Title>
        <Row justify="center" style={{ marginBottom: 32, marginTop: 32 }}>
          <Col span={4}></Col>
          <Col span={5}>
            <Title level={4}>Product Name</Title>
          </Col>
          <Col span={3}>
            <Title level={4}>Unit Price</Title>
          </Col>
          <Col span={2}>
            <Title level={4}>Quantity</Title>
          </Col>
          <Col span={4}>
            <Title level={4}>Total</Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {cartItems.map((item) => (
              <div key={item.id}>
                <CartItem item={item} />
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col style={{ marginLeft: '16rem', marginTop: '4rem' }}>
            <Title
              level={2}
              style={{
                color: '#076678',
                fontSize: '4rem',
                fontWeight: 'bolder',
                textAlign: 'left',
                textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
              }}
            >
              Shipping Address
            </Title>
            <Title level={4}>Address: {localStorage.getItem('userAddress')}</Title>
            <Title level={4}>District: {localStorage.getItem('userDistrict')}</Title>
            <Title level={4}>City: {localStorage.getItem('userCity')}</Title>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 16, marginBottom: 16 }}>
          <Button type="primary" shape="round" onClick={handleCreateInvoice}>
            Create Order
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductCart;
