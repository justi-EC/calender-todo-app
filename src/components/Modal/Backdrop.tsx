import styled from 'styled-components';

const BackdropStyle = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 20;
	background-color: rgba(0, 0, 0, 0.5);
`;

const Backdrop = () => {
	return <BackdropStyle />;
};

export default Backdrop;
