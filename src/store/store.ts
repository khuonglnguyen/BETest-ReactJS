import rootReducer from '@reducer/reducer';
import { configureStore } from '@reduxjs/toolkit';

const preloadedState = (window as any).__PRELOADED_STATE__;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  preloadedState,
});

export default store;
