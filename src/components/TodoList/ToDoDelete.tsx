import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';
import { Xmark } from '@styled-icons/fa-solid';
import { Container, CloseButton, Button } from '../../style/modalStyle';
import useFireStore from '../../hooks/useFireStore';

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
