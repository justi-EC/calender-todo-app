import { createSlice } from '@reduxjs/toolkit';
const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		create: false,
		cal: false,
		edit: false,
		delete: false,
	},
	reducers: {
		handleCreateModal: (state, action) => {
			state.create = action.payload;
		},
		handleCalModal: (state, action) => {
			state.cal = action.payload;
		},
		handleEditModal: (state) => {
			state.edit = !state.edit;
		},
		handleDeleteModal: (state) => {
			state.delete = !state.delete;
		},
	},
});

export const modalActions = modalSlice.actions;

export default modalSlice;
