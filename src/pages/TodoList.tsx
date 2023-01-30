import React from 'react';
import styled from 'styled-components';
import { DocumentData } from 'firebase/firestore';

const ListWrapper = styled.div`
	margin: 70px 0 40px 0;
`;

const TodoList = ({ title, content }: DocumentData) => {
	return (
		<>
			<div>{title}</div>
			<div>{content}</div>
		</>
	);
};

export default TodoList;
