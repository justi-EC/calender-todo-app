import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import { Subtitle } from '../../style/authStyle';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useFireStore from '../../hooks/useFireStore';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';

const Container = styled.div`
	width: 400px;
	height: 600px;
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 1rem;
	transform: translate(-50%, -50%);
	background-color: white;
	border: none;
	border-radius: 10px;
	filter: drop-shadow(0 0 25px rgb(0 0 0 / 0.4));
`;
const CloseButton = styled.button`
	position: absolute;
	right: 10px;
	top: 10px;
	background-color: transparent;
	cursor: pointer;
	border: none;
`;

const ModalTitle = styled(Subtitle)``;

const InputTitle = styled.input`
	display: block;
	width: 70%;
	margin-bottom: 1.5rem;
	border: 0;
	border-bottom: 1px solid gray;
	outline: 0;
	font-size: 1.3rem;
	color: gray;
	font-family: var(--font-NotoSansKR-Regular);

	&:focus {
		border-bottom: 2px solid black;
	}
`;

const Content = styled.textarea`
	width: 100%;
	height: 28vh;
	padding: 0.4rem;
	margin: 0.5rem 0 0.5rem 0;
	box-sizing: border-box;
	border: solid 1px lightgrey;
	border-radius: 5px;
	font-size: 16px;
	resize: none;
	font-size: 1.3rem;
	color: gray;
	font-family: var(--font-NotoSansKR-Regular);
`;

const LabelTitle = styled.label`
	display: block;
	font-size: 1.2rem;
	color: gray;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: var(--primary-color-700);
	font-size: 1.2rem;
	font-weight: bold;
	position: absolute;
	right: 20px;
	top: 590px;
`;

const portalElement = document.getElementById('overlays') as HTMLElement;

const ToDoCreate = () => {
	const dispatch = useDispatch();
	const { addDocument, response } = useFireStore('Todos');
	const [newContent, setNewContent] = useState({
		title: '',
		content: '',
	});

	const [isFailed, setIsFailed] = useState({
		checkTitle: false,
		checkContent: false,
	});

	const auth = getAuth();
	const user = auth.currentUser;
	let userId = '';
	if (user) {
		userId = user.uid;
	}

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
			setIsFailed({ ...isFailed, checkTitle: true });
		} else if (newContent.content.length <= 0) {
			setIsFailed({ ...isFailed, checkContent: true });
		} else {
			addDocument({
				userId,
				...newContent,
			});
			setNewContent({ title: '', content: '' });
			dispatch(modalActions.handleListModal(false));
		}
	};

	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>
					<Container>
						<CloseButton
							onClick={() => dispatch(modalActions.handleListModal(false))}
						>
							<Xmark width={40} height={40} />
						</CloseButton>
						{/* 아이콘 */}
						<ModalTitle>할 일 작성하기</ModalTitle>
						<LabelTitle htmlFor="title">제목</LabelTitle>
						<InputTitle
							type="text"
							id="name"
							name="title"
							onBlur={handleTodoContent}
						/>
						<LabelTitle htmlFor="title">내용</LabelTitle>
						<Content id="textarea" name="content" onBlur={handleTodoContent} />
						<Button type="submit" onClick={submitToDo}>
							확인
						</Button>
					</Container>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default ToDoCreate;
