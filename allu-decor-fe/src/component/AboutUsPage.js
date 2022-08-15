import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BankOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Carousel, Col, Row, Spin, Typography } from 'antd';

import { getAllAboutUs } from '../feature/AdminAboutUs/AdminAboutUsSlice';
import { getAllContactInfos } from '../feature/AdminContactInfo/AdminContactInfoSlice';
import contactUsImage from '../images/aboutus/contactus.png';
import aboutUsImage from '../images/aboutus/mission.jpg';
import whoWeAreImage from '../images/aboutus/whoweare.jpg';

import styles from '../css/AboutUS.module.css';
const { Title } = Typography;
const AboutUsPage = () => {
  const dispatch = useDispatch();
  const aboutUsPairs = useSelector((state) => state.adminAboutUsReducer.aboutUs);
  const contactPairs = useSelector((state) => state.adminContactInfoReducer.contactInfo);

  React.useEffect(() => {
    dispatch(getAllAboutUs());
  }, []);

  React.useEffect(() => {
    dispatch(getAllContactInfos());
  }, []);

  return (
    <div>
      <div className={styles.space}></div>
      <Row align="middle" gutter={10} style={{ margin: 'auto', width: '80%' }}>
        <Col span={9}>
          <Carousel autoplay>
            {aboutUsPairs ? (
              aboutUsPairs.map((pair) => (
                <div key={pair.key}>
                  <Title
                    style={{
                      color: '#076678',
                      fontSize: '4rem',
                      fontWeight: 'bolder',
                      textAlign: 'center',
                      textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
                    }}
                  >
                    ABOUT US
                  </Title>
                  <Title level={5} style={{ textAlign: 'center' }}>
                    {pair.content}
                  </Title>
                </div>
              ))
            ) : (
              <Row justify="center">
                <Spin size="large" />
              </Row>
            )}
          </Carousel>
        </Col>
        <Col span={15}>
          <img
            className={styles.imgAboutUs}
            src={aboutUsImage}
            style={{
              boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'rgba(131,165,152,0.7)',
            }}
          />
        </Col>
      </Row>
      <div className={styles.space}></div>
      <Row justify="center">
        <img
          className={styles.imgWhoWeAre}
          src={whoWeAreImage}
          style={{
            boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgba(131,165,152,0.7)',
          }}
        />
      </Row>
      <div className={styles.space}></div>
      <Row align="middle" gutter={10} style={{ margin: 'auto', width: '80%' }}>
        <Col span={14}>
          <img
            className={styles.imgContact}
            src={contactUsImage}
            style={{
              boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'rgba(131,165,152,0.7)',
            }}
          />
        </Col>
        <Col span={10}>
          <div
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
            <Title
              style={{
                color: '#076678',
                fontSize: '4rem',
                fontWeight: 'bolder',
                textAlign: 'left',
                textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
              }}
            >
              CONTACT US
            </Title>
            {contactPairs ? (
              contactPairs.map((pair) => (
                <div key={pair.key}>
                  <Row align="center">
                    <Col span={2}>
                      <BankOutlined style={{ fontSize: '25px', color: '#076678' }} />
                    </Col>
                    <Col span={22}>
                      <Title level={4} style={{ color: '#076678' }}>
                        {pair.address + ', ' + pair.ward + ', ' + pair.city}{' '}
                      </Title>
                    </Col>
                  </Row>
                  <Row align="center">
                    <Col span={2}>
                      <MailOutlined style={{ fontSize: '25px', color: '#076678' }} />
                    </Col>
                    <Col span={22}>
                      <Title level={4} style={{ color: '#076678' }}>
                        {pair.email}
                      </Title>
                    </Col>
                  </Row>
                  <Row align="center">
                    <Col span={2}>
                      <PhoneOutlined style={{ fontSize: '25px', color: '#076678' }} />
                    </Col>
                    <Col span={22}>
                      <Title level={4} style={{ color: '#076678' }}>
                        {pair.phone}
                      </Title>
                    </Col>
                  </Row>
                </div>
              ))
            ) : (
              <Row justify="center">
                <Spin size="large" />
              </Row>
            )}
          </div>
        </Col>
      </Row>
      <div className={styles.space}></div>
    </div>
  );
};

export default AboutUsPage;
