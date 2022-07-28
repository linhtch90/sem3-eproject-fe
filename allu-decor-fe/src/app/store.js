import { configureStore } from '@reduxjs/toolkit';

import faqReducer from '../feature/faq/FaqSlice';
import userReducer from '../feature/user/UserSlice';

export const store = configureStore({
  reducer: {
    faqReducer,
    userReducer,
  },
});
