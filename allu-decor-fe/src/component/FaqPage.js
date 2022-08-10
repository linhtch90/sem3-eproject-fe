import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Row, Spin } from 'antd';

import { getAllFaqPairs } from '../feature/faq/FaqSlice';

const { Panel } = Collapse;

const FaqPage = () => {
  const dispatch = useDispatch();
  const storedFaqPairs = useSelector((state) => state.faqReducer.faqPairs);

  React.useEffect(() => {
    dispatch(getAllFaqPairs());
  }, []);

  return (
    <div style={{ margin: 'auto', width: '80%' }}>
      <h1>Faq page</h1>
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
    </div>
  );
};

export default FaqPage;
