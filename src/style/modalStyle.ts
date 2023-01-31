import styled from 'styled-components';

const Container = styled.div`
	width: 400px;
	height: 600px;
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
	right: 20px;
	top: 590px;
`;

const Content = styled.textarea`
	width: 100%;
	height: 28vh;
	padding: 0.4rem;
	margin: 0.5rem 0 0.5rem 0;
	box-sizing: border-box;
	border: solid 1px lightgrey;
	border-radius: 5px;
	font-size: 16px;
	resize: none;
	font-size: 1.3rem;
	color: gray;
	font-family: var(--font-NotoSansKR-Regular);
`;

const LabelTitle = styled.label`
	display: block;
	font-size: 1.2rem;
	color: gray;
`;

const InputTitle = styled.input`
	display: block;
	width: 70%;
	margin-bottom: 1.5rem;
	border: 0;
	border-bottom: 1px solid gray;
	outline: 0;
	font-size: 1.3rem;
	color: gray;
	font-family: var(--font-NotoSansKR-Regular);

	&:focus {
		border-bottom: 2px solid black;
	}
`;

export { Container, CloseButton, Button, Content, LabelTitle, InputTitle };
