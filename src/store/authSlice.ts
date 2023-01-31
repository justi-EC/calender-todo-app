import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface AuthType {
	user: User | null;
	userName: string | null;
	isLoggedIn: boolean;
}

const authInit: AuthType = {
	user: null,
	userName: null,
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
		userName: (state, action) => {
			state.userName = action.payload;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
