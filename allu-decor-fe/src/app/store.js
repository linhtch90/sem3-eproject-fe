import { configureStore } from '@reduxjs/toolkit';

import adminProductReducer from '../feature/admin_product/AdminProductSlice';
import adminProjectReducer from '../feature/admin_project/AdminProjectSlice';
import cartReducer from '../feature/cart/CartSlice';
import domainReducer from '../feature/domain/DomainSlice';
import faqReducer from '../feature/faq/FaqSlice';
import invoiceReducer from '../feature/invoice/InvoiceSlice';
import invoiceitemReducer from '../feature/invoiceitem/InvoiceitemSlice';
import productReducer from '../feature/product/ProductSlice';
import serviceReducer from '../feature/service/ServiceSlice';
import userReducer from '../feature/user/UserSlice';

export const store = configureStore({
  reducer: {
    faqReducer,
    userReducer,
    adminProjectReducer,
    adminProductReducer,
    domainReducer,
    serviceReducer,
    productReducer,
    cartReducer,
    invoiceReducer,
    invoiceitemReducer,
  },
});
