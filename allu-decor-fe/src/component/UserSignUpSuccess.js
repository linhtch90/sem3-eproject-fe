import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const UserSignUpSuccess = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <Result
        status="success"
        title="Create user account successfully"
        subTitle="You can use your registered email and password for signing in now!"
        extra={[
          <Button type="primary" shape="round" icon={<HomeOutlined />} key="home" onClick={handleClick}>
            Back to Homepage
          </Button>,
        ]}
      />
    </div>
  );
};

export default UserSignUpSuccess;
