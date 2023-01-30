import { createSlice } from '@reduxjs/toolkit';
const fireStoreSlice = createSlice({
	name: 'firestore',
	initialState: {
		isPending: false,
		document: null,
		success: false,
		error: null,
	},
	reducers: {
		isPending: (state) => {
			state.isPending = true;
			state.document = null;
			state.error = null;
			state.success = false;
		},
		addDoc: (state, action) => {
			state.isPending = false;
			state.document = action.payload;
			state.error = null;
			state.success = true;
		},
		deleteDoc: (state, action) => {
			state.isPending = false;
			state.document = action.payload;
			state.error = null;
			state.success = true;
		},
		updateDoc: (state, action) => {
			state.isPending = false;
			state.document = action.payload;
			state.error = null;
			state.success = true;
		},
		error: (state, action) => {
			state.isPending = false;
			state.document = action.payload;
			state.error = null;
			state.success = false;
		},
	},
});

export const fireStoreActions = fireStoreSlice.actions;
export default fireStoreSlice;
