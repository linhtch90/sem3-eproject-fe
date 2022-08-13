import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Col, Row, Spin, Typography } from 'antd';

import { getAllCustomerReviewPairs } from '../feature/customerreview/CustomerReviewSlice';
import customerReviewImage from '../images/home/customer_review.webp';

const { Title } = Typography;

const CustomerReviewComponent = () => {
  const dispatch = useDispatch();
  const storedCustomerReviewPairs = useSelector((state) => state.customerReviewReducer.customerReviewPairs);

  React.useEffect(() => {
    dispatch(getAllCustomerReviewPairs());
  }, []);

  return (
    <Row justify="center" style={{ margin: 'auto', width: '80%' }}>
      <Col span={24}>
        <Row justify="center">
          <Title
            style={{
              color: '#076678',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'center',
              textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
              marginBottom: '4rem',
            }}
          >
            What Our Customers Say
          </Title>
        </Row>
        <Row>
          <Col span={12}>
            <Carousel autoplay>
              {storedCustomerReviewPairs ? (
                storedCustomerReviewPairs.map((pair) => (
                  <div key={pair.key}>
                    <Row justify="center">
                      <Col
                        style={{
                          width: '100%',
                          background: '#F9F5D7',
                          height: '26rem',
                          padding: '2rem',
                          borderWidth: '0.5rem',
                          borderColor: '#83A598',
                          borderStyle: 'solid',
                        }}
                      >
                        <img src={pair.image} style={{ width: '20%', borderRadius: '50%' }} />
                        <Title level={4} style={{ color: '#B16286' }}>
                          {pair.firstname + ' ' + pair.lastname}
                        </Title>
                        <Title level={3} style={{ color: '#D65D0E' }}>
                          {pair.company}
                        </Title>
                        <Title level={5}>{'"' + pair.content + '"'}</Title>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <Row justify="center">
                  <Spin size="large" />
                </Row>
              )}
            </Carousel>
          </Col>
          <Col span={12}>
            <img
              src={customerReviewImage}
              style={{
                width: '100%',
                height: '100%',
                boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'rgba(131,165,152,0.7)',
                marginLeft: '1rem',
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CustomerReviewComponent;
