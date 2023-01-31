import {
	ToDoHeader,
	ToDoTitle,
	IconButton,
	UserName,
	WelcomeText,
} from '../style/mainStyle';
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
import { RootState } from '../store';
import { signOut } from 'firebase/auth';
import { authActions } from '../store/authSlice';
import { useDispatch } from 'react-redux';

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

	type QueryType = [string, WhereFilterOp, string];

	const userId = user!.uid;
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
	};

	useEffect(() => {
		getData();
	}, [calModalState, createModalState, editModalState, deleteModalState]);

	return (
		<>
			<ToDoHeader>
				<ToDoTitle>나의 할 일</ToDoTitle>

				<IconButton onClick={toggleMenu}>
					<Menu width={80} height={80} />
				</IconButton>
			</ToDoHeader>
			<UserName>{userName}님</UserName>
			<WelcomeText>반갑습니다!</WelcomeText>

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

			{calModalState && <Calender />}
		</>
	);
};

export default ToDoPage;
