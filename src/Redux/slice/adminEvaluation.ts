import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateTypes {
  value: number;
}

const initialState: StateTypes = {
  value: 0,
};

const adminEvaluationSlice = createSlice({
  name: 'adminEvaluation',
  initialState,
  reducers: {
    
  },
});

export const {  } = adminEvaluationSlice.actions;
export default adminEvaluationSlice.reducer;
