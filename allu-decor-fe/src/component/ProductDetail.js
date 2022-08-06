import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Col, Image, Row, Spin, Typography } from 'antd';

import { addToCart } from '../feature/cart/CartSlice';
import { getProductById } from '../feature/product/ProductSlice';

const { Title, Text } = Typography;

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productReducer.productDetail);

  React.useEffect(() => {
    dispatch(getProductById({ id: params.productId }));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(productDetail.id));
  };
  return (
    <Row>
      {productDetail ? (
        <Row>
          <Row gutter={16} justify="space-between" style={{ marginLeft: 40, marginTop: 40, marginBottom: 40 }}>
            <Row>
              <Col span={12} style={{ padding: 16 }}>
                <Image width={'100%'} src={productDetail.image} />
              </Col>
              <Col span={12}>
                <Row justify="end">
                  <Title style={{ color: '#076678' }}>{productDetail.name}</Title>
                </Row>
                <Row justify="end">
                  <Title level={2} style={{ color: '#D65D0E' }}>
                    {productDetail.price} USD
                  </Title>
                </Row>
                <Row justify="end" style={{ marginTop: 16, marginBottom: 16 }}>
                  <Button type="primary" shape="round" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginLeft: 40, marginTop: 40, marginBottom: 40 }}>
              <Title level={2} style={{ color: '#B16286' }}>
                Detail Information
              </Title>
              <Title level={4} style={{ color: '#504945' }}>
                {productDetail.description}
              </Title>
            </Row>
          </Row>
        </Row>
      ) : (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      )}
    </Row>
  );
};

export default ProductDetail;
