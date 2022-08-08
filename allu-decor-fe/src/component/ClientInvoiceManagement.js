import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';

import { getAllInvoicesByUserId } from '../feature/invoice/InvoiceSlice';
import { getAllItemsByInvoiceId } from '../feature/invoiceitem/InvoiceitemSlice';
import { getAllProducts, getProductById } from '../feature/product/ProductSlice';

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

const ClientInvoiceManagement = () => {
  const localUserId = localStorage.getItem('userid');
  const dispatch = useDispatch();
  const invoicesByUserId = useSelector((state) => state.invoiceReducer.invoicesByUserId);
  const invoiceitems = useSelector((state) => state.invoiceitemReducer.invoiceitems);
  const productDetail = useSelector((state) => state.productReducer.productDetail);

  const [itemRow, setItemRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllInvoicesByUserId({ id: localUserId }));
  }, []);

  const onSelectChange = async (key, newSelectedRow) => {
    const { id } = newSelectedRow[0];
    await dispatch(getAllItemsByInvoiceId({ id }));
    handleGetProducts();
  };

  const handleGetProducts = async () => {
    if (invoiceitems) {
      await invoiceitems.map(async (item) => {
        await dispatch(getProductById({ id: item.productid }));
        handleCombineData({ item });
      });
    }
  };

  const handleCombineData = ({ item }) => {
    console.log(itemRow);
    setItemRow(itemRow.push({ ...item, ...productDetail }));
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  return (
    <div>
      <h1>Client Invoice Management</h1>
      <Table columns={invoiceColumns} dataSource={invoicesByUserId} rowSelection={rowSelection} />
      <Table columns={invoiceItemColumns} dataSource={itemRow} />
    </div>
  );
};

export default ClientInvoiceManagement;
