import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Image, Row, Spin, Typography } from 'antd';

import { getAllProducts } from '../feature/admin_product/AdminProductSlice';
import { addToCart, getCartProductById } from '../feature/cart/CartSlice';

const { Title } = Typography;

const ProductHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleAddToCartClick = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Row gutter={16} style={{ marginTop: 40, marginBottom: 40 }}>
      {products ? (
        products.map((product) => (
          <Col
            span={7}
            key={product.id}
            style={{ margin: 16, padding: 8, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: 8 }}
          >
            <Image width={'100%'} src={product.image} />
            <Title level={3} style={{ color: '#076678', marginTop: 16 }}>
              {product.name}
            </Title>
            <Title level={4} style={{ color: '#D65D0E' }}>
              Price: {product.price} USD
            </Title>
            <Row justify="space-evenly" style={{ marginTop: 16, marginBottom: 16 }}>
              <Col span={16}>
                <Button block type="primary" shape="round" onClick={() => navigate(product.id)}>
                  Details
                </Button>
              </Col>
            </Row>
            <Row justify="space-evenly" style={{ marginBottom: 16 }}>
              <Col span={16}>
                <Button block type="primary" shape="round" onClick={() => handleAddToCartClick(product)}>
                  Add to Cart
                </Button>
              </Col>
            </Row>
          </Col>
        ))
      ) : (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      )}
    </Row>
  );
};

export default ProductHome;
