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
	font-size: 3rem;
	color: var(--primary-color-700);
`;

const IconButton = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

export { ToDoHeader, ToDoTitle, IconButton };
