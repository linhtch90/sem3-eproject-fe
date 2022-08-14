import React from 'react';
import { Col, Row, Typography } from 'antd';

import adminHomeImage from '../images/admin/admin-home-page.jpg';

const { Title } = Typography;

const AdminHome = () => {
  return (
    <div>
      <Row justify="center" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <Col>
          <Row justify="center">
            <Title
              style={{
                color: '#076678',
                fontSize: '4rem',
                fontWeight: 'bolder',
                textAlign: 'center',
                textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
              }}
            >
              Welcome to admin page!
            </Title>
          </Row>
          <Row justify="center">
            <img
              src={adminHomeImage}
              width={450}
              height={400}
              style={{
                boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'rgba(131,165,152,0.7)',
              }}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AdminHome;
