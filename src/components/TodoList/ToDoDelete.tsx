import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import useFireStore from '../../hooks/useFireStore';
import styled from 'styled-components';
import { Container } from './ToDoCreate';

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
					<DeleteContainer>
						<button onClick={onClose}>
							<Xmark width={40} height={40} />
						</button>
						<div>정말로 삭제하시겠습니까?</div>
						<SubmitButton type="submit" onClick={handleDelete}>
							확인
						</SubmitButton>
					</DeleteContainer>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default ToDoDelete;

const DeleteContainer = styled(Container)`
	display: flex;
	height: 10rem;
	flex-direction: column;
	align-items: center;

	div {
		margin-top: 2rem;
	}
`;

const SubmitButton = styled.button`
	padding: 0.5em;
	margin-top: 1rem;
	font-size: 25px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.primaryBlue1000};
`;
