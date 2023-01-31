import {
	Container,
	CloseButton,
	Button,
	LabelTitle,
	InputTitle,
	Content,
} from '../../style/modalStyle';
import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import { Subtitle } from '../../style/authStyle';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useFireStore from '../../hooks/useFireStore';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';

const portalElement = document.getElementById('overlays') as HTMLElement;

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
			setIsFailed({ ...isFailed, checkTitle: true });
		} else if (newContent.content.length <= 0) {
			setIsFailed({ ...isFailed, checkContent: true });
		} else {
			addDocument({
				userId,
				...newContent,
			});
			setNewContent({ title: '', content: '' });
			dispatch(modalActions.handleCreateModal(false));
		}
	};

	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>
					<Container>
						<CloseButton
							onClick={() => dispatch(modalActions.handleCreateModal(false))}
						>
							<Xmark width={40} height={40} />
						</CloseButton>
						{/* 아이콘 */}
						<Subtitle>할 일 작성하기</Subtitle>
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
