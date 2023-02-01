import styled from 'styled-components';

const ToDoHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-right: 2rem;
	opacity: 70%;

	h1 {
		display: inline-block;
		margin: 1.5rem;
		font-size: 5rem;
		color: var(--primary-color-700);
	}

	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
`;

const UserHeader = styled.div`
	strong {
		margin-left: 1.8rem;
		font-size: 2.5rem;
		color: #9d9c9cec;
	}

	div {
		margin-left: 1.8rem;
		margin-bottom: 2rem;
		font-size: 2rem;
		color: rgb(195, 195, 195);
	}
`;

export { ToDoHeader, UserHeader };
