import { Container } from '../../style/modalStyle';
import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useFireStore from '../../hooks/useFireStore';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';
import { HelperText } from '../../style/authStyle';

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

						<button type="submit" onClick={submitToDo}>
							확인
						</button>
					</Container>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default ToDoCreate;
