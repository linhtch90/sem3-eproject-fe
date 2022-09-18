import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const UserUpdateSuccess = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div style={{ marginTop: '8rem', marginBottom: '8rem' }}>
      <Result
        status="success"
        title="Update user account successfully"
        subTitle="You can use your updated information for signing in now!"
        extra={[
          <Button type="primary" shape="round" icon={<HomeOutlined />} key="home" onClick={handleClick}>
            Back to Homepage
          </Button>,
        ]}
      />
    </div>
  );
};

export default UserUpdateSuccess;
