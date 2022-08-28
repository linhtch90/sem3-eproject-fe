import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Image, Input, Row, Spin, Typography } from 'antd';

import { addToCart } from '../feature/cart/CartSlice';
import { createFeedback, getAllByProductId } from '../feature/feedback/FeedbackSlice';
import { getProductById } from '../feature/product/ProductSlice';

const { Title, Text } = Typography;

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productReducer.productDetail);
  const feedbacks = useSelector((state) => state.feedbackReducer.feedbacks);

  const [feedbackValue, setFeedbackValue] = React.useState('');

  React.useEffect(() => {
    dispatch(getProductById({ id: params.productId }));
    dispatch(getAllByProductId({ id: params.productId }));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(productDetail.id));
  };

  const handleFeedbackChange = (e) => {
    setFeedbackValue(e.target.value);
  };

  const handleCreateFeedback = async () => {
    await dispatch(
      createFeedback({
        firstname: localStorage.getItem('userFirstname'),
        lastname: localStorage.getItem('userLastname'),
        userid: localStorage.getItem('userid'),
        content: feedbackValue,
        productid: productDetail.id,
        createat: new Date().toISOString(),
      })
    );
    setFeedbackValue('');
    await dispatch(getAllByProductId({ id: params.productId }));
  };

  return (
    <Row>
      {productDetail ? (
        <Row>
          <Row gutter={16} justify="space-between" style={{ marginLeft: 40, marginTop: 40, marginBottom: 40 }}>
            <Row>
              <Col span={12} style={{ padding: 16 }}>
                <Image
                  width={'100%'}
                  src={productDetail.image}
                  style={{
                    boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
                    marginBottom: '32px',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: 'rgba(131,165,152,0.7)',
                  }}
                />
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
            <Row style={{ marginLeft: 40, marginBottom: 40, width: '100%' }}>
              <Col span={24}>
                <Row style={{ width: '100%' }}>
                  <Title level={2} style={{ color: '#B16286' }}>
                    Feedbacks
                  </Title>
                </Row>
                {localStorage.getItem('userid') ? (
                  <Row>
                    <Form.Item style={{ width: '100%' }}>
                      <Input.TextArea showCount maxLength={250} value={feedbackValue} onChange={handleFeedbackChange} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        shape="round"
                        htmlType="button"
                        onClick={handleCreateFeedback}
                        icon={<SendOutlined />}
                      >
                        Send Feedback
                      </Button>
                    </Form.Item>
                  </Row>
                ) : null}
                <Row>
                  {feedbacks ? (
                    feedbacks.map((feedback) => (
                      <Col key={feedback.id} style={{ marginBottom: '1.5rem' }}>
                        <Row align="middle">
                          <Avatar style={{ backgroundColor: '#1890ff' }}>{feedback.firstname.charAt(0)}</Avatar>
                          <Title level={5} style={{ marginLeft: '1rem' }}>
                            {feedback.firstname + ' ' + feedback.lastname}
                          </Title>
                        </Row>
                        <Text level={6}>{feedback.content}</Text>
                      </Col>
                    ))
                  ) : (
                    <Row justify="center">
                      <Spin size="large" />
                    </Row>
                  )}
                </Row>
              </Col>
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
