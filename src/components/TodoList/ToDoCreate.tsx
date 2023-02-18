import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useFireStore from '../../hooks/useFireStore';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';
import { HelperText } from '../../pages/Login';
import styled from 'styled-components';

const ToDoCreate = () => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const { addDocument } = useFireStore('Todos');
	const [newContent, setNewContent] = useState({
		title: '',
		content: '',
	});

	const userId = user!.uid;

	const [isFailed, setIsFailed] = useState({
		checkTitle: false,
		checkContent: false,
	});

	const handleTodoContent = (
		e:
			| React.FocusEvent<HTMLInputElement>
			| React.FocusEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setNewContent({ ...newContent, [name]: value });
	};

	const submitToDo = async () => {
		if (newContent.title.length <= 0) {
			setIsFailed({
				checkTitle: true,
				checkContent: false,
			});
		} else if (newContent.content.length <= 0) {
			setIsFailed({
				checkTitle: false,
				checkContent: true,
			});
		} else {
			addDocument({
				userId,
				...newContent,
			});
			setNewContent({ title: '', content: '' });
			dispatch(modalActions.handleCreateModal(false));
		}
	};

	const portalElement = document.getElementById('overlays') as HTMLElement;

	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>
					<Container>
						<button
							onClick={() => dispatch(modalActions.handleCreateModal(false))}
						>
							<Xmark width={40} height={40} />
						</button>
						<div>할 일 작성하기</div>
						<label htmlFor="title">제목</label>
						<input
							type="text"
							id="name"
							name="title"
							onBlur={handleTodoContent}
						/>
						<label htmlFor="title">내용</label>
						<textarea id="textarea" name="content" onBlur={handleTodoContent} />
						<HelperText isWrong={isFailed.checkTitle}>
							제목을 입력해주세요.
						</HelperText>
						<HelperText isWrong={isFailed.checkContent}>
							내용을 입력해주세요.
						</HelperText>

						<SubmitButton type="submit" onClick={submitToDo}>
							확인
						</SubmitButton>
					</Container>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default ToDoCreate;

export const SubmitButton = styled.button`
	color: ${({ theme }) => theme.colors.primaryBlue700};
	font-size: 1.2rem;
	font-weight: bold;
	position: absolute;
	right: 20px;
	top: 550px;
`;

export const Container = styled.div`
	width: 20rem;
	height: 30rem;
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 1rem;
	transform: translate(-50%, -50%);
	background-color: white;
	border-radius: 10px;
	filter: drop-shadow(0 0 25px rgb(0 0 0 / 0.4));

	button:first-child {
		position: absolute;
		right: 10px;
		top: 10px;
		opacity: 70%;
		transition-duration: 0.2s;
		&:hover {
			opacity: 100%;
		}
	}

	label {
		display: block;
		font-size: 1.2rem;
		color: ${({ theme }) => theme.colors.gray300};
	}

	input {
		display: block;
		width: 70%;
		margin-bottom: 1.5rem;
		border: 0;
		border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
		font-size: 1.3rem;
		color: ${({ theme }) => theme.colors.gray300};

		&:focus {
			border-bottom: 2px solid ${({ theme }) => theme.colors.primaryBlue500};
		}
	}

	textarea {
		width: 100%;
		height: 55%;
		padding: 0.4rem;
		margin: 1rem 0;
		border: solid 1px ${({ theme }) => theme.colors.gray100};
		border-radius: 5px;
		font-size: 1.3rem;
		color: ${({ theme }) => theme.colors.gray300};
		&:focus {
			border: 2px solid ${({ theme }) => theme.colors.primaryBlue500};
		}
	}

	div {
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
		color: ${({ theme }) => theme.colors.primaryBlue700};
	}
`;
