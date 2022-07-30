import React from 'react';
import { Col, Row } from 'antd';

import adminHomeImage from '../images/admin/admin-home-page.jpg';

const AdminHome = () => {
  return (
    <div>
      <Row>
        <Col>
          <img src={adminHomeImage} width={450} height={400} />
        </Col>
        <Col>Welcome to admin page!</Col>
      </Row>
    </div>
  );
};

export default AdminHome;
