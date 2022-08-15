import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, notification, Row, Select, Steps, Table, Typography } from 'antd';

import { getAllInvoices, getAllInvoicesByUserId, updateInvoice } from '../feature/invoice/InvoiceSlice';
import { getAllItemsByInvoiceId } from '../feature/invoiceitem/InvoiceitemSlice';
const { Title } = Typography;

const { Step } = Steps;
const { Option } = Select;

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

const AdminInvoiceManagement = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoiceReducer.invoices);
  const invoiceitems = useSelector((state) => state.invoiceitemReducer.invoiceitems);

  const [currentInvoiceStatusIndex, setCurrentInvoiceStatusIndex] = React.useState(6);
  const [selectInvoiceId, setSelectInvoiceId] = React.useState('');

  React.useEffect(() => {
    dispatch(getAllInvoices());
  }, []);

  const onSelectChange = (key, newSelectedRow) => {
    const { id } = newSelectedRow[0];
    dispatch(getAllItemsByInvoiceId({ id }));
    const invoiceStatus = invoices.find((item) => item.id === id).status;
    const statusIndex = statusList.find((item) => item.status === invoiceStatus).index;
    setCurrentInvoiceStatusIndex(statusIndex);
    setSelectInvoiceId(id);
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  const handleSelectStatusChange = async (value) => {
    setCurrentInvoiceStatusIndex(statusList.find((item) => item.status === value).index);
    const { id, createat, totalprice, userid } = invoices.find((invoice) => invoice.id === selectInvoiceId);
    await dispatch(updateInvoice({ id, createat, totalprice, status: value, userid }));
    await dispatch(getAllInvoices());
  };

  return (
    <div style={{ padding: 16 }}>
      <Row justify="center">
        <Title
          style={{
            color: '#076678',
            fontSize: '3rem',
            fontWeight: 'bolder',
            textAlign: 'left',
            textShadow: '4px 4px 0px rgba(131,165,152,0.7)',
          }}
        >
          Admin Invoice Page
        </Title>
      </Row>
      <Col span={24}>
        <Title level={4} style={{ color: '#D65D0E' }}>
          Invoice
        </Title>

        <Table columns={invoiceColumns} dataSource={invoices} rowSelection={rowSelection} />
        <Title level={4} style={{ color: '#D65D0E' }}>
          Equivalent Invoice Items
        </Title>

        <Table columns={invoiceItemColumns} dataSource={invoiceitems} />

        {currentInvoiceStatusIndex < 6 ? (
          <div>
            <Title level={4} style={{ color: '#D65D0E' }}>
              Status
            </Title>

            <Steps current={currentInvoiceStatusIndex}>
              {statusList.map((statusItem) => (
                <Step title={statusItem.status} description={''} key={statusItem.index} />
              ))}
            </Steps>
            {/* <Row justify="center" style={{ marginTop: 32, marginBottom: 32 }}>
            <Button type="primary" shape="round" onClick={rejectInvoice}>
              Reject Invoice
            </Button>
          </Row> */}
            <Row justify="center" style={{ marginTop: 32, marginBottom: 32 }}>
              <Select placeholder="Select Invoice Status" onChange={handleSelectStatusChange}>
                {statusList.map((statusItem) => (
                  <Option key={statusItem.index} value={statusItem.status}>
                    {statusItem.status}
                  </Option>
                ))}
              </Select>
            </Row>
          </div>
        ) : null}
      </Col>
    </div>
  );
};

export default AdminInvoiceManagement;
