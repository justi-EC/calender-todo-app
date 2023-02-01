import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import useFireStore from '../../hooks/useFireStore';
import styled from 'styled-components';

const portalElement = document.getElementById('overlays') as HTMLElement;

interface Props {
	onClose: () => void;
	contentId: string;
}

const ToDoDelete = ({ onClose, contentId }: Props) => {
	const { delDocument } = useFireStore('Todos');

	const handleDelete = async () => {
		delDocument(contentId);
		onClose();
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
						<div>정말로 삭제하시겠습니까?</div>
						<button type="submit" onClick={handleDelete}>
							확인
						</button>
					</Container>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default ToDoDelete;

const Container = styled.div`
	display: flex;
	height: 200px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 400px;
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 1rem;
	transform: translate(-50%, -50%);
	background-color: white;
	border: none;
	border-radius: 10px;
	filter: drop-shadow(0 0 25px rgb(0 0 0 / 0.4));

	button:first-child {
		position: absolute;
		right: 10px;
		top: 10px;
		background-color: transparent;
		cursor: pointer;
		border: none;
	}

	button:last-child {
		background-color: transparent;
		border: none;
		padding: 0.5em;
		margin-top: 2rem;
		font-size: 30px;
		font-weight: bold;
		color: var(--primary-color-700);
		transition-duration: 0.3s;
		&:hover {
			color: var(--primary-color-1000);
		}
		font-family: var(--font-NotoSansKR-Regular);
	}

	div {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 2rem;
		color: var(--primary-color-1000);
	}
`;
