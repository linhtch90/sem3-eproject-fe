import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Image, Input, notification, Row, Tooltip, Typography } from 'antd';

import { removeFromCart, removeItem, setQuantity } from '../feature/cart/CartSlice';

const { Title } = Typography;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [api] = notification.useNotification();

  const [quantityValue, setQuantityValue] = React.useState(item.quantity);

  const raiseInvalidQuantity = () => {
    api.info({
      message: 'Invalid Quantity',
      description: 'Quantity must be a positive integer less than 100. Otherwise, please contact our sale department!',
    });
  };

  const handleIncrease = () => {
    if (parseInt(quantityValue) + 1 > 0 && parseInt(quantityValue) + 1 < 100) {
      setQuantityValue(parseInt(quantityValue) + 1);
      dispatch(setQuantity({ id: item.id, quantity: Math.round(quantityValue + 1) }));
    }
  };

  const handleDecrease = () => {
    if (parseInt(quantityValue) - 1 > 0 && parseInt(quantityValue) - 1 < 100) {
      setQuantityValue(parseInt(quantityValue) - 1);
      dispatch(setQuantity({ id: item.id, quantity: parseInt(quantityValue) - 1 }));
    }
  };

  const handleChange = (e) => {
    if (Math.round(e.target.value) > 0 && Math.round(e.target.value) < 100) {
      setQuantityValue(e.target.value);
      dispatch(setQuantity({ id: item.id, quantity: Math.round(e.target.value) }));
    }
  };

  const handleDelete = () => {
    dispatch(removeItem({ id: item.id }));
    dispatch(removeFromCart(item.id));
  };

  return (
    <Row justify="center" style={{ width: '80%', margin: 'auto', marginBottom: 32 }}>
      <Col span={4} style={{ marginRight: 16 }}>
        <Image size={'20%'} src={item.image} />
      </Col>
      <Col span={5}>
        <Title level={3}>{item.name}</Title>
      </Col>
      <Col span={3}>
        <Title level={4}>{item.price} USD</Title>
      </Col>
      <Col span={3}>
        <Tooltip
          trigger={['focus']}
          title={'Quantity must be a positive integer less than 100. Otherwise please contact our sale department!'}
          placement="bottom"
        >
          {item.quantity > 1 ? (
            <Button
              type="primary"
              shape="circle"
              icon={<MinusOutlined />}
              onClick={item.quantity < 100 && item.quantity > 0.5 ? handleDecrease : raiseInvalidQuantity}
            />
          ) : (
            <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
          )}
          <Input
            value={quantityValue}
            maxLength={2}
            style={{ width: 48, marginLeft: 8, marginRight: 8 }}
            onChange={handleChange}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={item.quantity < 100 ? handleIncrease : raiseInvalidQuantity}
          />
        </Tooltip>
      </Col>
      <Col span={3}>
        <Title level={4}>{item.totalprice} USD</Title>
      </Col>
    </Row>
  );
};

export default CartItem;
