import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Image, Input, Row, Select, Spin, Typography } from 'antd';

import { getAllProducts } from '../feature/admin_product/AdminProductSlice';
import { addToCart } from '../feature/cart/CartSlice';
import { getAllDomains } from '../feature/domain/DomainSlice';
import { filterProductByDomain, getProductByName } from '../feature/product/ProductSlice';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const ProductHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const domains = useSelector((state) => state.domainReducer.domains);

  React.useEffect(() => {
    dispatch(getAllDomains());
    dispatch(getAllProducts());
  }, []);

  const handleAddToCartClick = (product) => {
    dispatch(addToCart(product));
  };

  const handleSearch = (value) => {
    if (value) {
      dispatch(getProductByName({ name: value }));
    } else {
      dispatch(getAllProducts());
    }
  };

  const handleFilterByDomain = (value) => {
    dispatch(filterProductByDomain({ id: value }));
  };

  return (
    <Col>
      <Row justify="center" style={{ marginTop: '4rem' }}>
        <Col span={12} style={{ marginRight: '2rem' }}>
          <Search
            placeholder="Enter Product Name..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
          />
        </Col>
        <Col span={4}>
          <Select placeholder="Filter by Domain" onChange={handleFilterByDomain} style={{ width: '100%' }} size="large">
            {domains
              ? domains.map((domain) => (
                  <Option key={domain.id} value={domain.id}>
                    {domain.name}
                  </Option>
                ))
              : null}
          </Select>
        </Col>
      </Row>
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
    </Col>
  );
};

export default ProductHome;
