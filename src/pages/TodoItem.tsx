import React from 'react';

const TodoItem = ({ id, title, content }: any) => {
	return (
		<>
			<div>{id}</div>
			<div>{title}</div>
			<div>{content}</div>
		</>
	);
};

export default TodoItem;
