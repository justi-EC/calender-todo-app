import React from 'react';
import styled from 'styled-components';
interface Props {
	children: React.ReactNode;
}

const ModalOverlay = ({ children }: Props) => {
	return <OverlayStyle>{children}</OverlayStyle>;
};

export default ModalOverlay;

const OverlayStyle = styled.div`
	position: fixed;
	top: 50vh;
	left: 5%;
	width: 90%;
	z-index: 30;
	animation: slide-down 250ms ease-out forwards;

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-3rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;
