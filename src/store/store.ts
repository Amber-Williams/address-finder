import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import registrationReducer from '../components/registration/registrationSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
