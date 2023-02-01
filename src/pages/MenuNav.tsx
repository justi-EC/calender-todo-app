import styled from 'styled-components';
import { Xmark } from '@styled-icons/fa-solid/Xmark';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modalSlice';
interface Props {
	toggle: () => void;
	logout: () => void;
}

const MenuNav = ({ toggle, logout }: Props) => {
	const dispatch = useDispatch();

	return (
		<Nav>
			<div onClick={toggle}>
				<Xmark width={40} height={40} />
			</div>
			<div onClick={() => dispatch(modalActions.handleCreateModal(true))}>
				새 리스트 작성
			</div>
			<div onClick={() => dispatch(modalActions.handleCalModal(true))}>
				달력 보기
			</div>
			<div onClick={logout}>로그아웃</div>
		</Nav>
	);
};

export default MenuNav;

const Nav = styled.div`
	position: fixed;
	right: 0;
	bottom: 0;
	height: 100%;
	width: 300px;
	background-color: var(--primary-color-800);
	filter: drop-shadow(0 0 25px rgb(0 0 0 / 0.2));
	animation: slide 200ms ease-out forwards;

	@keyframes slide {
		from {
			opacity: 0;
			transform: translateX(0);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	div:first-child {
		margin: 2rem;
		cursor: pointer;
		background-color: transparent;
		border: none;
		opacity: 70%;
		transition-duration: 0.3s;

		&:hover {
			opacity: 100%;
		}
	}

	div:nth-child(n + 2) {
		display: flex;
		justify-content: center;
		padding: 3rem;
		color: #ffffff;
		font-size: 25px;
		font-weight: bold;
		cursor: pointer;
		transition-duration: 0.3s;

		&:hover {
			background-color: var(--primary-color-900);
		}
	}
`;
