import { createSlice } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';

interface DocType {
	doc: DocumentData;
}

const initialState: DocType = {
	doc: [],
};

const docSlice = createSlice({
	name: 'doc',
	initialState,
	reducers: {
		setDocument: (state, action) => {
			state.doc = action.payload;
		},
	},
});

export const docActions = docSlice.actions;

export default docSlice;
