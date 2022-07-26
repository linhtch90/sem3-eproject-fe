import { configureStore } from '@reduxjs/toolkit';

import faqReducer from '../feature/faq/faqSlice';

export const store = configureStore({
  reducer: {
    faqReducer,
  },
});
