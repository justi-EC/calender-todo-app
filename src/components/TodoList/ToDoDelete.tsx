import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import useFireStore from '../../hooks/useFireStore';
import styled from 'styled-components';
import { Subtitle } from '../../style/authStyle';

const Container = styled.div`
	width: 400px;
	height: 200px;
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

const Button = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: var(--primary-color-700);
	font-size: 1.2rem;
	font-weight: bold;
	position: absolute;
	right: 190px;
	top: 180px;
	&:hover {
		color: var(--primary-color-900);
	}
`;

const WarningTitle = styled(Subtitle)`
	color: var(--primary-color-1000);
	position: relative;
	top: 50px;
	left: 35px;
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
					<Container>
						<CloseButton onClick={onClose}>
							<Xmark width={40} height={40} />
						</CloseButton>
						<WarningTitle>정말로 삭제하시겠습니까?</WarningTitle>
						<Button type="submit" onClick={handleDelete}>
							확인
						</Button>
					</Container>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default ToDoDelete;
