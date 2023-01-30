import { createSlice } from '@reduxjs/toolkit';
const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		list: false,
		cal: false,
	},
	reducers: {
		handleListModal: (state, action) => {
			state.list = action.payload;
		},
		handleCalModal: (state, action) => {
			state.cal = action.payload;
		},
	},
});

export const modalActions = modalSlice.actions;

export default modalSlice;
