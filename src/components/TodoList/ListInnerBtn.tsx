import { useState } from 'react';
import styled from 'styled-components';
import { DocumentData } from 'firebase/firestore';
import ToDoDelete from './ToDoDelete';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';
import ToDoEdit from './ToDoEdit';

const EditBtnWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
`;

const BtnBackGround = styled.div`
	// border: 1px solid blue;
	width: 40px;
	height: 40px;
	margin-left: 10px;
	text-align: center;
	border-radius: 50%;
	&:hover {
		background-color: #f6f6f6;
		cursor: pointer;
	}
`;

const ListInnerBtn = ({
	contentId,
	title,
	content,
	createdTime,
}: DocumentData) => {
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
			<EditBtnWrapper>
				<div>{`${new Date(createdTime.seconds * 1000)}`.slice(0, 15)}</div>
				<BtnBackGround onClick={handleEditOpen}>수정</BtnBackGround>
				<BtnBackGround onClick={handleClickOpen}>삭제</BtnBackGround>
				{open === true ? (
					<ToDoDelete onClose={handleClose} contentId={contentId} />
				) : null}
				{editOpen === true ? (
					<ToDoEdit
						onClose={handleEditClose}
						contentId={contentId}
						title={title}
						content={content}
					/>
				) : null}
			</EditBtnWrapper>
		</>
	);
};

export default ListInnerBtn;
