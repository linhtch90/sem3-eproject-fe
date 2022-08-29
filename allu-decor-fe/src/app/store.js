import { configureStore } from '@reduxjs/toolkit';

import adminCustomerReviewReducer from '../feature/admin_customerreview/AdminCustomerReviewSlice';
import adminDomainReducer from '../feature/admin_domain/AdminDomainSlice';
import adminFaqReducer from '../feature/admin_faq/AdminFaqSlice';
import adminFeedbackReducer from '../feature/admin_feedback/AdminFeedbackSlice';
import adminProductReducer from '../feature/admin_product/AdminProductSlice';
import adminProjectReducer from '../feature/admin_project/AdminProjectSlice';
import adminServiceReducer from '../feature/admin_service/AdminServiceSlice';
import adminUserReducer from '../feature/admin_user/AdminUserSlice';
import adminAboutUsReducer from '../feature/AdminAboutUs/AdminAboutUsSlice';
import adminContactInfoReducer from '../feature/AdminContactInfo/AdminContactInfoSlice';
import cartReducer from '../feature/cart/CartSlice';
import customerReviewReducer from '../feature/customerreview/CustomerReviewSlice';
import domainReducer from '../feature/domain/DomainSlice';
import faqReducer from '../feature/faq/FaqSlice';
import feedbackReducer from '../feature/feedback/FeedbackSlice';
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
    adminUserReducer,
    adminFaqReducer,
    adminFeedbackReducer,
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
    feedbackReducer,
  },
});
