import { Menu } from '@styled-icons/boxicons-regular/Menu';
import { useState, useEffect } from 'react';
import MenuNav from './MenuNav';
import ToDoCreate from '../components/TodoList/ToDoCreate';
import { appAuth, appFireStore } from '../firebase/config';
import TodoList from './ToDoList';
import {
	DocumentData,
	Query,
	WhereFilterOp,
	collection,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import Calender from '../components/Calender/Calender';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { signOut } from 'firebase/auth';
import { authActions } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { docActions } from '../store/docSlice';
import SubCalender from '../components/Calender/SubCalender';
import styled from 'styled-components';
import useMediaQuery from '../hooks/useMediaQuery';

const ToDoPage = () => {
	const [isMenuToggled, setIsMenuToggled] = useState(false);
	const [documents, setDocuments] = useState<DocumentData>();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const calModalState = useSelector(
		(state: RootState) => state.handleModal.cal
	);
	const createModalState = useSelector(
		(state: RootState) => state.handleModal.create
	);
	const editModalState = useSelector(
		(state: RootState) => state.handleModal.edit
	);
	const deleteModalState = useSelector(
		(state: RootState) => state.handleModal.delete
	);
	const userName = useSelector((state: RootState) => state.auth.userName);
	const user = useSelector((state: RootState) => state.auth.user);
	let userId = '';

	const toggleMenu = () => {
		setIsMenuToggled(!isMenuToggled);
	};

	const handleLogOut = async () => {
		try {
			await signOut(appAuth);
			dispatch(authActions.logout());
			navigate('/');
		} catch (error: any) {
			throw new Error('로그아웃에 실패했습니다.');
		}
	};

	if (user !== null) {
		userId = user.uid;
	}
	type QueryType = [string, WhereFilterOp, string];

	const myQuery: QueryType = ['userId', '==', userId];

	const getData = async () => {
		const q: Query<DocumentData> = query(
			collection(appFireStore, 'Todos'),
			where(...myQuery),
			orderBy('createdTime', 'desc')
		);
		const res = await getDocs(q);
		let result: DocumentData = [];
		res.docs.forEach((doc) => {
			result.push({ ...doc.data(), id: doc.id });
		});
		setDocuments(result);
		dispatch(docActions.setDocument(result));
	};

	useEffect(() => {
		getData();
	}, [calModalState, createModalState, editModalState, deleteModalState]);

	const isAboveMediumScreens = useMediaQuery('(min-width:1200px)');

	return (
		<>
			<ToDoHeader>
				<h1>나의 할 일</h1>
				<button onClick={toggleMenu}>
					<Menu width={80} height={80} />
				</button>
			</ToDoHeader>
			<UserHeader>
				<h1>{userName}님</h1>
				<div>반갑습니다!</div>
			</UserHeader>

			{documents &&
				documents.map((item: DocumentData, index: number) => {
					return (
						<TodoList
							key={index}
							title={item.title}
							content={item.content}
							contentId={item.id}
							createdTime={item.createdTime}
						/>
					);
				})}

			{!isMenuToggled && <MenuNav toggle={toggleMenu} logout={handleLogOut} />}

			{createModalState && <ToDoCreate />}

			{calModalState && (
				<>
					<Calender />
					{isAboveMediumScreens && <SubCalender />}
				</>
			)}
		</>
	);
};

export default ToDoPage;

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
		font-weight: 500;
		color: ${({ theme }) => theme.colors.primaryBlue700};
	}
`;

const UserHeader = styled.div`
	h1 {
		margin-left: 1.8rem;
		font-size: 2.5rem;
		color: ${({ theme }) => theme.colors.gray300};
	}

	div {
		margin-left: 1.8rem;
		margin-bottom: 2rem;
		font-size: 2rem;
		color: ${({ theme }) => theme.colors.gray100};
	}
`;
