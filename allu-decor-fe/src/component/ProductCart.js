import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'antd';

import CartItem from './CartItem';

const ProductCart = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  return (
    <Row>
      <Col span={24}>
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
