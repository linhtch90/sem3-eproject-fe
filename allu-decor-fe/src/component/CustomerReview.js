import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Col, Row, Spin } from 'antd';

import { getAllCustomerReviewPairs } from '../feature/customerreview/CustomerReviewSlice';

import styles from '../css/HomePage.module.css';

const CustomerReviewComponent = () => {
  const dispatch = useDispatch();
  const storedCustomerReviewPairs = useSelector((state) => state.customerReviewReducer.customerReviewPairs);

  React.useEffect(() => {
    dispatch(getAllCustomerReviewPairs());
  }, []);

  return (
    <div>
      {storedCustomerReviewPairs ? (
        <Carousel autoplay>
          {storedCustomerReviewPairs.map((pair, index) => (
            <div key={index}>
              <Row align="middle">
                <Col span={9}>
                  <img className={styles.imgCustomer} src={pair.image} />
                </Col>
                <Col span={15}>
                  <h1>CUSTOMER REVIEW</h1>
                  <h1>Name: {pair.lastname}</h1>
                  <p>Company: {pair.company}</p>
                  <p>{pair.content}</p>
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>
      ) : (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      )}
    </div>
  );
};

export default CustomerReviewComponent;
