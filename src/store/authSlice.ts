import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'authentication',
	initialState: {
		user: null,
		isLoggedIn: false,
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
