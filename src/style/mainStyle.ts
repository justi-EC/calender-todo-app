import styled from 'styled-components';

const ToDoHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-right: 2rem;
	opacity: 70%;
`;

const ToDoTitle = styled.h1`
	display: inline-block;
	margin: 1.5rem;
	font-size: 5rem;
	color: var(--primary-color-700);
`;

const IconButton = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

const UserName = styled.strong`
	margin-left: 1.8rem;
	font-size: 2.5rem;
	color: #9d9c9cec;
`;

const WelcomeText = styled.div`
	margin-left: 1.8rem;
	margin-bottom: 2rem;
	font-size: 2rem;
	color: rgb(195, 195, 195);
`;

export { ToDoHeader, ToDoTitle, IconButton, UserName, WelcomeText };
