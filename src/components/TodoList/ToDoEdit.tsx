import { Container } from '../../style/modalStyle';
import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import { HelperText } from '../../style/authStyle';
import { useState } from 'react';
import useFireStore from '../../hooks/useFireStore';

const portalElement = document.getElementById('overlays') as HTMLElement;

interface Props {
	onClose: () => void;
	contentId: string;
}

const ToDoEdit = ({ onClose, contentId }: Props) => {
	const { updateDocument } = useFireStore('Todos');
	const [todoData, setTodoData] = useState({
		title: '',
		content: '',
	});
	const [isFailed, setIsFailed] = useState({
		checkTitle: false,
		checkContent: false,
	});

	const handleEditTodo = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTodoData({ ...todoData, [name]: value });
	};

	const submitToDo = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (todoData.title.length <= 0) {
			setIsFailed({
				checkTitle: true,
				checkContent: false,
			});
		} else if (todoData.content.length <= 0) {
			setIsFailed({
				checkTitle: false,
				checkContent: true,
			});
		} else {
			updateDocument(contentId, todoData);
			onClose();
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
						{/* 아이콘 */}
						<div>내용 수정하기</div>
						<label htmlFor="title">제목</label>
						<input
							type="text"
							id="name"
							name="title"
							onChange={handleEditTodo}
						/>
						<label htmlFor="title">내용</label>
						<textarea id="textarea" name="content" onChange={handleEditTodo} />
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

export default ToDoEdit;
