import styled from 'styled-components';
import { DocumentData } from 'firebase/firestore';
import { useRef, useState } from 'react';
import ListInnerBtn from '../components/TodoList/ListInnerBtn';

const Container = styled.div`
	max-width: 1200px;
	margin: 1rem;
	border: 1px solid lightgray;
	border-radius: 20px;
	padding: 1em;
	cursor: pointer;
	&:hover {
		background-color: #f8f8f8;
	}
`;
const HeaderTitle = styled.h2`
	display: inline-block;
	margin: 0;
	margin-bottom: 2px;
	vertical-align: super;
	font-size: 3rem;
	color: var(--primary-color-800);
`;

const Contents = styled.div`
	display: inline-block;
	margin: 0;
	font-size: 2rem;
	color: #616161;
`;

const ContentsWrapper = styled.div`
	height: 0;
	width: 100%;
	overflow: hidden;
	transition: height 0.35s ease;
`;

const ToDoList = ({ title, content, contentId, createdTime }: DocumentData) => {
	const [isCollapse, setIsCollapse] = useState(false);
	const parentRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);

	const handleButtonClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
		e.stopPropagation();
		if (parentRef.current === null || childRef.current === null) {
			return;
		}
		if (parentRef.current.clientHeight > 0) {
			parentRef.current.style.height = '0';
		} else {
			parentRef.current.style.height = `${childRef.current.clientHeight}px`;
		}
		setIsCollapse(!isCollapse);
	};

	return (
		<Container onClick={handleButtonClick}>
			<HeaderTitle onClick={handleButtonClick}>{title}</HeaderTitle>
			<ContentsWrapper ref={parentRef}>
				<Contents ref={childRef}>{content}</Contents>
			</ContentsWrapper>
			<ListInnerBtn
				contentId={contentId}
				title={title}
				content={content}
				createdTime={createdTime}
			/>
		</Container>
	);
};

export default ToDoList;
