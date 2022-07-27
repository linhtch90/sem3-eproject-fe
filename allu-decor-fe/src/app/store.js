import { configureStore } from '@reduxjs/toolkit';

import adminCustomerReviewReducer from '../feature/admin_customerreview/AdminCustomerReviewSlice';
import adminDomainReducer from '../feature/admin_domain/AdminDomainSlice';
import adminProductReducer from '../feature/admin_product/AdminProductSlice';
import adminProjectReducer from '../feature/admin_project/AdminProjectSlice';
import cartReducer from '../feature/cart/CartSlice';
import customerReviewReducer from '../feature/customerreview/CustomerReviewSlice';
import adminServiceReducer from '../feature/admin_service/AdminServiceSlice';
import adminAboutUsReducer from '../feature/AdminAboutUs/AdminAboutUsSlice';
import adminContactInfoReducer from '../feature/AdminContactInfo/AdminContactInfoSlice';
import domainReducer from '../feature/domain/DomainSlice';
import faqReducer from '../feature/faq/FaqSlice';
import invoiceReducer from '../feature/invoice/InvoiceSlice';
import invoiceitemReducer from '../feature/invoiceitem/InvoiceitemSlice';
import productReducer from '../feature/product/ProductSlice';
import projectReducer from '../feature/project/ProjectSlice';
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
    customerReviewReducer,
    adminCustomerReviewReducer,
    adminContactInfoReducer,
    adminAboutUsReducer,
    adminDomainReducer,
    adminServiceReducer,
    projectReducer,
  },
});
