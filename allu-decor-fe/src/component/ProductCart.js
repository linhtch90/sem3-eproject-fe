import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Row, Typography } from 'antd';

import CartItem from './CartItem';

const { Title } = Typography;

const ProductCart = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  return (
    <Row>
      <Col span={24}>
        <Row justify="center" style={{ marginBottom: 32, marginTop: 32 }}>
          <Col span={4} style={{ marginRight: 16 }}></Col>
          <Col span={5}>
            <Title level={4}>Product Name</Title>
          </Col>
          <Col span={3}>
            <Title level={4}>Unit Price</Title>
          </Col>
          <Col span={3}>
            <Title level={4}>Quantity</Title>
          </Col>
          <Col span={3}>
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
        <Row justify="center" style={{ marginTop: 16, marginBottom: 16 }}>
          <Button type="primary" shape="round">
            Create Order
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductCart;
