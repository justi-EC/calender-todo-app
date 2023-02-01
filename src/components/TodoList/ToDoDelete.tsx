import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import useFireStore from '../../hooks/useFireStore';
import styled from 'styled-components';
import { Subtitle } from '../../style/authStyle';
import { Button, CloseButton, Container } from '../../style/modalStyle';

const DeleteContainer = styled(Container)`
	display: flex;
	height: 200px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const WarningTitle = styled(Subtitle)`
	margin-top: 2rem;
	color: var(--primary-color-1000);
`;

const DeleteButton = styled.button`
	background-color: transparent;
	border: none;
	padding: 0.5em;
	font-size: 30px;
	font-weight: bold;
	color: var(--primary-color-700);
	transition-duration: 0.3s;
	&:hover {
		color: var(--primary-color-1000);
	}
	font-family: var(--font-NotoSansKR-Regular);
`;

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
						<CloseButton onClick={onClose}>
							<Xmark width={40} height={40} />
						</CloseButton>
						<WarningTitle>정말로 삭제하시겠습니까?</WarningTitle>
						<DeleteButton type="submit" onClick={handleDelete}>
							확인
						</DeleteButton>
					</DeleteContainer>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default ToDoDelete;
