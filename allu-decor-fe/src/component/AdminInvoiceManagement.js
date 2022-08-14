import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification, Row, Select, Steps, Table } from 'antd';

import { getAllInvoices, getAllInvoicesByUserId, updateInvoice } from '../feature/invoice/InvoiceSlice';
import { getAllItemsByInvoiceId } from '../feature/invoiceitem/InvoiceitemSlice';

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
    <div style={{ width: '80%', margin: 'auto' }}>
      <h1>Invoice</h1>
      <Table columns={invoiceColumns} dataSource={invoices} rowSelection={rowSelection} />

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
    </div>
  );
};

export default AdminInvoiceManagement;
