import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={handleClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default UnauthorizedPage;
