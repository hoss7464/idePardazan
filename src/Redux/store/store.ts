import { configureStore } from '@reduxjs/toolkit';
import adminEvaluationReducer from "../slice/slice" 

export const store = configureStore({
  reducer: {
    adminEvaluation: adminEvaluationReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
