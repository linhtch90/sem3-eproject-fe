import React from 'react';
import { Button, Card, Carousel, Col, Form, Input, Row } from 'antd';

import CustomerReviewComponent from '../component/CustomerReview';
import imageUser1 from '../images/CR-Alexander.jpg';
import imageUser2 from '../images/CR-Lina.jpg';
import newProductImageUrl from '../images/newproducts.jpg';

import styles from '../css/HomePage.module.css';

//=====Introduction Component=====
const IntroductionComponent = () => {
  return (
    <Row>
      <Col span={15}>
        <img className={styles.imgIntroLeft} src="images/intro-1.jpg" />
      </Col>
      <Col span={9}>
        <div className={styles.introductionContent}>
          <p>WELCOME TO</p>
          <h1>ALLURING DECORS</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s
          </p>
          <Button type="primary" shape="round">
            Read More
          </Button>
        </div>
        <div className={styles.introductionContent}>
          <img className={styles.imgIntroRight} src="images/intro-2.jpg" />
        </div>
      </Col>
    </Row>
  );
};

//=====Project Component=====
const IntroProjectComponent = () => {
  return (
    <Row align="middle" gutter={10}>
      <Col span={9}>
        <div>
          <h1>OUR PROJECTS</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s
          </p>
          <Button type="primary" shape="round">
            Read More
          </Button>
        </div>
      </Col>
      <Col span={15}>
        <img className={styles.imgIntroProject} src="images/intro-project.jpg" />
      </Col>
    </Row>
  );
};

//=====Products Component=====
const ProductItemComponent = ({ imgurl, title }) => {
  return (
    <Card hoverable>
      <img width="200" src={imgurl} />
      <p>{title}</p>
    </Card>
  );
};

const ProductsComponent = () => {
  return (
    <Row>
      <div className={styles.introductionContent}>
        <h1>OUR PRODUCTS</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
          standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s
        </p>
      </div>

      <Col span={6}>
        <ProductItemComponent imgurl={newProductImageUrl} title={'Home Decor'} />
      </Col>
      <Col span={6}>
        <ProductItemComponent imgurl={newProductImageUrl} title={'Office Decor'} />
      </Col>
      <Col span={6}>
        <ProductItemComponent imgurl={newProductImageUrl} title={'Metting Decor'} />
      </Col>
      <Col span={6}>
        <ProductItemComponent imgurl={newProductImageUrl} title={'Restaurant Decor'} />
      </Col>
    </Row>
  );
};

//=====Contact Us Component=====
const ContactUsForm = () => {
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="firstname"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastname"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="TextArea"
        name="textArea"
        rules={[
          {
            required: true,
            message: 'Please input your requirement!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

function ContactUsComponent() {
  return (
    <Row>
      <Col span={24} className={styles.centerContent}>
        <h1>CONTACT US</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </Col>
      <Col span={12}>
        <h1>Talk to Sales</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <p>1900 1234</p>
      </Col>
      <Col span={12}>
        <ContactUsForm />
      </Col>
    </Row>
  );
}

//=====Render Home Page=====
const HomePage = () => {
  return (
    <div style={{ margin: 'auto', width: '90%' }}>
      <IntroductionComponent />
      <div className={styles.spaceComponent}></div>
      <IntroProjectComponent />
      <div className={styles.spaceComponent}></div>
      <ProductsComponent />
      <div className={styles.spaceComponent}></div>
      <CustomerReviewComponent />
      <div className={styles.spaceComponent}></div>
      <ContactUsComponent />
    </div>
  );
};

export default HomePage;
