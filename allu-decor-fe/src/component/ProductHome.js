import React from 'react';
import { Button, Col, Image, Row, Typography } from 'antd';

import productSampleImage from '../images/product/sleeping-lamp-500x500.jpg';

const { Title } = Typography;

const ProductHome = () => {
  return (
    <Row>
      <Col span={6}>
        <Image width={'100%'} src={productSampleImage} />
        <Title level={2}>Sleeping Lamp</Title>
        <Title level={3}>Price: 15 USD</Title>
        <Row justify="space-evenly">
          <Col span={8}>
            <Button block type="primary" shape="round">
              Details
            </Button>
          </Col>
          <Col span={8}>
            <Button block type="primary" shape="round">
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductHome;
