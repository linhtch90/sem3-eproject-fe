import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Collapse, Row, Spin, Typography } from 'antd';

import { getAllFaqPairs } from '../feature/faq/FaqSlice';
import faqPicture from '../images/faq/faq.png';

const { Panel } = Collapse;
const { Title } = Typography;

const FaqPage = () => {
  const dispatch = useDispatch();
  const storedFaqPairs = useSelector((state) => state.faqReducer.faqPairs);

  React.useEffect(() => {
    dispatch(getAllFaqPairs());
  }, []);

  return (
    <Row style={{ margin: 'auto', width: '80%', marginTop: '6rem', marginBottom: '6rem' }} align="middle" gutter={8}>
      <Col span={12}>
        <div>
          {storedFaqPairs ? (
            <Collapse>
              {storedFaqPairs.map((pair, index) => (
                <Panel header={pair.question} key={index}>
                  <p>{pair.answer}</p>
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Row justify="center">
              <Spin size="large" />
            </Row>
          )}
        </div>
      </Col>
      <Col span={12}>
        <div>
          <Title
            style={{
              textAlign: 'center',
              color: '#076678',
              fontSize: '3rem',
              fontWeight: 'bolder',
              textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
            }}
          >
            Do you have questions?
          </Title>
          <Title
            level={2}
            style={{
              textAlign: 'center',
              color: '#FE8019',
              fontSize: '2rem',
              fontWeight: 'bolder',
              textShadow: '3px 3px 0px rgba(213,196,161,0.7)',
            }}
          >
            We have all answers
          </Title>
        </div>
        <img
          width={'100%'}
          src={faqPicture}
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

export default FaqPage;
