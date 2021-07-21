import { configureStore } from '@reduxjs/toolkit';
import loggedUserReducer from '../features/loggedUser/loggedUserSlice';

export default configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
  },
});
