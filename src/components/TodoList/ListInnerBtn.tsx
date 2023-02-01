import { useState } from 'react';
import styled from 'styled-components';
import { DocumentData } from 'firebase/firestore';
import ToDoDelete from './ToDoDelete';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';
import ToDoEdit from './ToDoEdit';

const ListInnerBtn = ({ contentId, createdTime }: DocumentData) => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const dispatch = useDispatch();

	const handleClickOpen = () => {
		setOpen(true);
		dispatch(modalActions.handleDeleteModal());
	};

	const handleClose = () => {
		setOpen(false);
		dispatch(modalActions.handleDeleteModal());
	};

	const handleEditOpen = () => {
		setEditOpen(true);
		dispatch(modalActions.handleEditModal());
	};

	const handleEditClose = () => {
		setEditOpen(false);
		dispatch(modalActions.handleEditModal());
	};

	return (
		<>
			<BtnWrapper>
				<div>{`${new Date(createdTime.seconds * 1000)}`.slice(0, 15)}</div>
				<div onClick={handleEditOpen}>수정</div>
				<div onClick={handleClickOpen}>삭제</div>
				{open === true ? (
					<ToDoDelete onClose={handleClose} contentId={contentId} />
				) : null}
				{editOpen === true ? (
					<ToDoEdit onClose={handleEditClose} contentId={contentId} />
				) : null}
			</BtnWrapper>
		</>
	);
};

export default ListInnerBtn;

const BtnWrapper = styled.div`
	display: flex;
	position: relative;
	left: 50rem;
	margin-bottom: 2rem;

	div:first-child {
		color: var(--primary-color-700);
	}

	div:nth-child(n + 2) {
		width: 40px;
		height: 40px;
		margin-left: 10px;
		text-align: center;
		color: darkgray;
		&:hover {
			color: var(--primary-color-700);
			cursor: pointer;
		}
	}
`;
