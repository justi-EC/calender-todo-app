import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { modalActions } from '../../store/modalSlice';

const BackdropStyle = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 20;
	background-color: rgba(0, 0, 0, 0.5);
`;

const Backdrop = () => {
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(modalActions.handleCalModal(false));
		dispatch(modalActions.handleListModal(false));
	};
	return <BackdropStyle onClick={handleClose} />;
};

export default Backdrop;
