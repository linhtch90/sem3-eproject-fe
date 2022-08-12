import React from 'react';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';

import projectDesignerImage from '../images/home/designer.webp';
import livingRoomHomeImage from '../images/home/living_room.webp';
import homeProductImage from '../images/home/product_home.webp';
import officeProductImage from '../images/home/product_office.webp';
import restaurantProductImage from '../images/home/product_restaurant.webp';
import newProductImageUrl from '../images/newproducts.jpg';

import CustomerReviewComponent from './CustomerReview';

import styles from '../css/HomePage.module.css';

const { Title } = Typography;

//=====Introduction Component=====
const IntroductionComponent = () => {
  return (
    <Row style={{ backgroundImage: `url(${livingRoomHomeImage})`, height: '555px' }}>
      {/* <Col span={15}>
        <img className={styles.imgIntroLeft} src="images/intro-1.jpg" />
      </Col> */}
      <Col span={9}>
        <div className={styles.introductionContent}>
          <Title
            style={{
              color: '#076678',
              fontSize: '9rem',
              fontWeight: 'bolder',
              textAlign: 'left',
              textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
              marginLeft: '14rem',
            }}
          >
            ALLURING DECORS
          </Title>
          <Button type="primary" shape="round">
            More About Us...
          </Button>
        </div>
        {/* <div className={styles.introductionContent}>
          <img className={styles.imgIntroRight} src="images/intro-2.jpg" />
        </div> */}
      </Col>
    </Row>
  );
};

//=====Project Component=====
const IntroProjectComponent = () => {
  return (
    <Row align="middle" gutter={10} style={{ margin: 'auto', width: '80%' }}>
      <Col span={9}>
        <div>
          <Title
            style={{
              color: '#076678',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'left',
              textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
            }}
          >
            SUCCESSFUL PROJECTS
          </Title>
          <Title level={5}>
            Alluring Decors offers signature colors to create solid color basics for the bedroom. The Felicity quilt
            sets are offered several colors they are a versatile addition to any bedroom decor.
          </Title>
          <Button type="primary" shape="round">
            Visit Our Projects...
          </Button>
        </div>
      </Col>
      <Col span={15}>
        <img
          className={styles.imgIntroProject}
          src={projectDesignerImage}
          style={{
            boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgba(131,165,152,0.7)',
          }}
        />
      </Col>
    </Row>
  );
};

//=====Products Component=====
const ProductItemComponent = ({ imgurl, title }) => {
  return (
    <Card hoverable>
      <img
        height="400px"
        width="400px"
        src={imgurl}
        style={{
          boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
          marginBottom: '32px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: 'rgba(131,165,152,0.7)',
        }}
      />
      <Title
        style={{
          color: '#FE8019',
          fontSize: '2rem',
          fontWeight: 'bolder',
          textAlign: 'center',
          textShadow: '3px 3px 0px rgba(213,196,161,0.7)',
        }}
      >
        {title}
      </Title>
    </Card>
  );
};

const ProductsComponent = () => {
  return (
    <Row justify="center">
      <Col>
        <Row justify="center" style={{ marginBottom: '2rem' }}>
          {/* <div className={styles.introductionContent}> */}
          <Title
            style={{
              color: '#076678',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'left',
              textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
            }}
          >
            OUR PRODUCTS
          </Title>
          {/* </div> */}
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <ProductItemComponent imgurl={homeProductImage} title={'Home Decor'} />
          </Col>
          <Col span={8}>
            <ProductItemComponent imgurl={officeProductImage} title={'Office Decor'} />
          </Col>
          <Col span={8}>
            <ProductItemComponent imgurl={restaurantProductImage} title={'Restaurant Decor'} />
          </Col>
        </Row>
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
    <div style={{ margin: 'auto', marginBottom: '6rem' }}>
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
