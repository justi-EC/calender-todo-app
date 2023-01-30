import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fireStoreSlice from './fireStoreSlice';
import modalSlice from './modalSlice';
import dateSlice from './dateSlice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		firestore: fireStoreSlice.reducer,
		handleModal: modalSlice.reducer,
		date: dateSlice.reducer,
	},
	middleware: (getDefaultMiddeware) =>
		getDefaultMiddeware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
