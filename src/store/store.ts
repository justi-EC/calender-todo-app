import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fireStoreSlice from './fireStoreSlice';
import modalSlice from './modalSlice';
import dateSlice from './dateSlice';
import docSlice from './docSlice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		firestore: fireStoreSlice.reducer,
		handleModal: modalSlice.reducer,
		date: dateSlice.reducer,
		doc: docSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
