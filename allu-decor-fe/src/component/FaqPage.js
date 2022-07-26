import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Spin } from 'antd';

import { getAllFaqPairs } from '../feature/faq/faqSlice';

const { Panel } = Collapse;

const FaqPage = () => {
  const dispatch = useDispatch();
  const storedFaqPairs = useSelector((state) => state.faqReducer.faqPairs);

  React.useEffect(() => {
    dispatch(getAllFaqPairs());
  }, []);

  return (
    <div>
      <h1>Faq page</h1>
      <div>
        <Collapse>
          {storedFaqPairs ? (
            storedFaqPairs.map((pair, index) => (
              <Panel header={pair.question} key={index}>
                <p>{pair.answer}</p>
              </Panel>
            ))
          ) : (
            <Spin size="large" />
          )}
        </Collapse>
      </div>
    </div>
  );
};

export default FaqPage;
