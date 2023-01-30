import { createSlice } from '@reduxjs/toolkit';

interface DateType {
	now: Date;
	click: Date | null;
}

const initialState: DateType = {
	now: new Date(),
	click: null,
};

const dateSlice = createSlice({
	name: 'date',
	initialState: initialState,
	reducers: {
		nowDate: (state, action) => {
			state.now = action.payload;
		},
		clickedDate: (state, action) => {
			state.click = action.payload;
		},
	},
});

export const dateActions = dateSlice.actions;
export default dateSlice;
