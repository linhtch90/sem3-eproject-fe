import { configureStore } from '@reduxjs/toolkit';

import adminProjectReducer from '../feature/admin_project/AdminProjectSlice';
import faqReducer from '../feature/faq/FaqSlice';
import userReducer from '../feature/user/UserSlice';

export const store = configureStore({
  reducer: {
    faqReducer,
    userReducer,
    adminProjectReducer,
  },
});
