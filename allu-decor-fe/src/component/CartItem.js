import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Image, Input, notification, Row, Tooltip, Typography } from 'antd';

import { decreaseQuantity, increaseQuantity, removeFromCart, removeItem, setQuantity } from '../feature/cart/CartSlice';

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
    if (Math.round(quantityValue + 1) > 0 && Math.round(quantityValue + 1) < 100) {
      setQuantityValue(quantityValue + 1);
      dispatch(setQuantity({ id: item.id, quantity: Math.round(quantityValue + 1) }));
    } else {
      raiseInvalidQuantity();
    }
  };

  const handleDecrease = () => {
    if (Math.round(quantityValue - 1) > 0 && Math.round(quantityValue - 1) < 100) {
      setQuantityValue(quantityValue - 1);
      dispatch(setQuantity({ id: item.id, quantity: Math.round(quantityValue - 1) }));
    } else {
      raiseInvalidQuantity();
    }
  };

  const handleChange = (e) => {
    if (Math.round(e.target.value) > 0 && Math.round(e.target.value) < 100) {
      setQuantityValue(e.target.value);
      dispatch(setQuantity({ id: item.id, quantity: Math.round(e.target.value) }));
    } else {
      raiseInvalidQuantity();
    }
  };

  const handleDelete = () => {
    dispatch(removeItem({ id: item.id }));
    dispatch(removeFromCart(item.id));
  };

  return (
    <Row>
      <Col span={4}>
        <Image size={'20%'} src={item.image} />
      </Col>
      <Col span={5}>
        <Title level={3}>{item.name}</Title>
      </Col>
      <Col span={5}>
        <Title level={4}>{item.price}</Title>
      </Col>
      <Col span={5}>
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
            style={{ width: 64, marginLeft: 8, marginRight: 8 }}
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
      <Col span={5}>
        <Title level={4}>{item.totalprice}</Title>
      </Col>
    </Row>
  );
};

export default CartItem;
