import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Container } from './Calender';
import ReactDOM from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import ModalOverlay from '../Modal/ModalOverlay';

const SubCalender = () => {
	const click = useSelector((state: RootState) => state.date.click);
	const doc = useSelector((state: RootState) => state.doc.doc);
	const [tmp, setTmp] = useState<DocumentData>([]);
	const portalElement = document.getElementById('overlays') as HTMLElement;

	useEffect(() => {
		const filtered = doc.filter((data: DocumentData) => {
			return (
				click?.toLocaleDateString() ===
				new Date(data.createdTime.seconds * 1000).toLocaleDateString()
			);
		});
		setTmp(filtered);
	}, [doc, click]);
	return (
		<>
			{ReactDOM.createPortal(
				<ModalOverlay>
					<SubContainer>
						<Title>
							<div>{click?.toLocaleDateString()}에 작성한 글 목록</div>
						</Title>
						<ContentWrapper>
							{tmp.map((data: DocumentData) => (
								<div key={data.id}>
									<Content>
										<div>{data.title}</div>
										<div>{data.content}</div>
									</Content>
								</div>
							))}
						</ContentWrapper>
					</SubContainer>
				</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default SubCalender;

const SubContainer = styled(Container)`
	width: 340px;
	left: 70%;
`;

const ContentWrapper = styled.div`
	width: 340px;
	height: 650px;
	overflow: auto;
`;

const Title = styled.div`
	display: flex;
	justify-content: center;
	color: var(--primary-color-700);
	margin-bottom: 1rem;
`;

const Content = styled.div`
	margin-bottom: 2rem;
	border: 2px solid var(--primary-color-500);
	border-radius: 10px;
	padding: 1rem;

	div:first-child {
		color: var(--primary-color-700);
	}
`;
