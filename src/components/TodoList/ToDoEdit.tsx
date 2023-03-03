import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import { useState } from 'react';
import useFireStore from '../../hooks/useFireStore';
import { HelperText } from '../../pages/Login';
import { Container, SubmitButton } from './ToDoCreate';

const portalElement = document.getElementById('overlays') as HTMLElement;

interface Props {
	onClose: () => void;
	contentId: string;
	title: string;
	content: string;
}

const ToDoEdit = ({ onClose, contentId, title, content }: Props) => {
	const { updateDocument } = useFireStore('Todos');
	const [todoData, setTodoData] = useState({
		title: '',
		content: '',
	});
	const [isFailed, setIsFailed] = useState({
		checkTitle: false,
		checkContent: false,
	});
	const [titleState, setTitleState] = useState(title);
	const [contentState, setContentState] = useState(content);

	const handleEditTodo = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTodoData({ ...todoData, [name]: value });
		e.target.name === 'title' && setTitleState(e.target.value);
		e.target.name === 'content' && setContentState(e.target.value);
	};

	const submitToDo = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (titleState.length <= 0) {
			setIsFailed({
				checkTitle: true,
				checkContent: false,
			});
		} else if (contentState.length <= 0) {
			setIsFailed({
				checkTitle: false,
				checkContent: true,
			});
		} else {
			onClose();
			updateDocument(contentId, { title: titleState, content: contentState });
		}
	};

	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>
					<Container>
						<button onClick={onClose}>
							<Xmark width={40} height={40} />
						</button>
						<div>내용 수정하기</div>
						<label htmlFor="title">제목</label>
						<input
							type="text"
							id="name"
							name="title"
							value={titleState}
							onChange={handleEditTodo}
						/>
						<label htmlFor="title">내용</label>
						<textarea
							id="textarea"
							name="content"
							value={contentState}
							onChange={handleEditTodo}
						/>
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

export default ToDoEdit;
