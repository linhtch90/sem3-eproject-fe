import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, notification, Row, Steps, Table, Typography } from 'antd';

import { getAllInvoicesByUserId, updateInvoice } from '../feature/invoice/InvoiceSlice';
import { getAllItemsByInvoiceId } from '../feature/invoiceitem/InvoiceitemSlice';
import signInImage from '../images/sign-in/sign-in.webp';

const { Step } = Steps;
const { Title } = Typography;

const invoiceColumns = [
  { title: 'Invoice ID', dataIndex: 'id' },
  { title: 'Created At', dataIndex: 'createat' },
  { title: 'Status', dataIndex: 'status' },
  { title: 'Total (USD)', dataIndex: 'totalprice' },
];

const invoiceItemColumns = [
  { title: 'Product Name', dataIndex: 'name' },
  { title: 'Price (USD)', dataIndex: 'price' },
  { title: 'Quantity', dataIndex: 'quantity' },
  { title: 'Total (USD)', dataIndex: 'totalprice' },
];

const statusList = [
  { status: 'Request Received', index: 0 },
  { status: 'Rejected', index: 1 },
  { status: 'Accepted', index: 2 },
  { status: 'Payment Received', index: 3 },
  { status: 'Service Began', index: 4 },
  { status: 'Service Completed', index: 5 },
];

const ClientInvoiceManagement = () => {
  const [api, contextHolder] = notification.useNotification();

  const localUserId = localStorage.getItem('userid');
  const dispatch = useDispatch();
  const invoicesByUserId = useSelector((state) => state.invoiceReducer.invoicesByUserId);
  const invoiceitems = useSelector((state) => state.invoiceitemReducer.invoiceitems);

  const [currentInvoiceStatusIndex, setCurrentInvoiceStatusIndex] = React.useState(6);
  const [selectInvoiceId, setSelectInvoiceId] = React.useState('');

  React.useEffect(() => {
    dispatch(getAllInvoicesByUserId({ id: localUserId }));
  }, []);

  const onSelectChange = (key, newSelectedRow) => {
    const { id } = newSelectedRow[0];
    dispatch(getAllItemsByInvoiceId({ id }));
    const invoiceStatus = invoicesByUserId.find((item) => item.id === id).status;
    const statusIndex = statusList.find((item) => item.status === invoiceStatus).index;
    setCurrentInvoiceStatusIndex(statusIndex);
    setSelectInvoiceId(id);
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  const rejectInvoice = async () => {
    if (currentInvoiceStatusIndex < 3) {
      setCurrentInvoiceStatusIndex(statusList.find((item) => item.status === 'Rejected').index);
      const { id, createat, totalprice, userid } = invoicesByUserId.find((invoice) => invoice.id === selectInvoiceId);
      await dispatch(updateInvoice({ id, createat, totalprice, status: 'Rejected', userid }));
      await dispatch(getAllInvoicesByUserId({ id: localUserId }));
    } else {
      api.warning({
        message: 'Cannot Reject Invoice',
        description: 'You cannot reject the invoice because payment process was completed',
        placement: 'bottomRight',
      });
    }
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      {localStorage.getItem('userid') ? (
        <>
          <h1>Invoice</h1>
          <Table columns={invoiceColumns} dataSource={invoicesByUserId} rowSelection={rowSelection} />

          <h1>Equivalent Invoice Items</h1>
          <Table columns={invoiceItemColumns} dataSource={invoiceitems} />

          {currentInvoiceStatusIndex < 6 ? (
            <div>
              <h1>Status</h1>
              <Steps current={currentInvoiceStatusIndex}>
                {statusList.map((statusItem) => (
                  <Step title={statusItem.status} description={''} key={statusItem.index} />
                ))}
              </Steps>
              <Row justify="center" style={{ marginTop: 32, marginBottom: 32 }}>
                <Button
                  type="primary"
                  shape="round"
                  onClick={rejectInvoice}
                  disabled={currentInvoiceStatusIndex >= 3 ? true : false}
                >
                  Reject Invoice
                </Button>
              </Row>
            </div>
          ) : null}
        </>
      ) : (
        <Col span={24}>
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
                  Please sign in first!
                </Title>
              </Row>
              <Row justify="center">
                <img
                  src={signInImage}
                  width={600}
                  height={550}
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
        </Col>
      )}
    </div>
  );
};

export default ClientInvoiceManagement;
