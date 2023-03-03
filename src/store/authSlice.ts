import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface AuthType {
	user: User | null;
	isLoggedIn: boolean;
}

const authInit: AuthType = {
	user: null,
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'authentication',
	initialState: authInit,
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
