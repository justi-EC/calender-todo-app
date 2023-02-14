import ReactDOM from 'react-dom';
import ModalOverlay from '../Modal/ModalOverlay';
import styled from 'styled-components';
import Backdrop from '../Modal/Backdrop';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import { Xmark } from '@styled-icons/fa-solid';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';

const portalElement = document.getElementById('overlays') as HTMLElement;
const Calender = () => {
	const dispatch = useDispatch();

	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>
					<Container>
						<CloseButton
							onClick={() => dispatch(modalActions.handleCalModal(false))}
						>
							<Xmark width={40} height={40} />
						</CloseButton>
						<ControlDate />
						<DateBox />
					</Container>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default Calender;

export const Container = styled.div`
	width: 600px;
	height: 700px;
	position: absolute;
	top: 50%;
	left: 35%;
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
