import {
	ToDoHeader,
	ToDoTitle,
	IconButton,
	Day,
	MonthDate,
} from '../style/mainStyle';
import { Menu } from '@styled-icons/boxicons-regular/Menu';
import { useState, useEffect } from 'react';
import MenuNav from './MenuNav';
import ToDoCreate from '../components/TodoList/ToDoCreate';
import { appAuth, appFireStore } from '../firebase/config';
import TodoList from './TodoList';
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import Calender from '../components/Calender/Calender';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { signOut } from 'firebase/auth';
import { authActions } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { todayDate, todayMonth, todayWeek } from '../components/Calender/Today';

const TodoPage = () => {
	const [isMenuToggled, setIsMenuToggled] = useState(false);
	const [documents, setDocuments] = useState<DocumentData>();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const calModalState = useSelector(
		(state: RootState) => state.handleModal.cal
	);
	const listModalState = useSelector(
		(state: RootState) => state.handleModal.list
	);

	const transaction = 'Todos';

	const toggleMenu = () => {
		setIsMenuToggled(!isMenuToggled);
	};

	const handleLogOut = async () => {
		try {
			const res = await signOut(appAuth);
			dispatch(authActions.logout());
			navigate('/');
		} catch (error: any) {
			throw new Error('로그아웃에 실패했습니다.');
		}
	};

	const getData = async () => {
		const res = await getDocs(collection(appFireStore, transaction));
		const newData = res.docs.map((doc) => doc.data());
		setDocuments(newData);
	};

	useEffect(() => {
		getData();
	}, [listModalState]);

	return (
		<>
			<ToDoHeader>
				<ToDoTitle>나의 할 일</ToDoTitle>
				<IconButton onClick={toggleMenu}>
					<Menu width={80} height={80} />
				</IconButton>
			</ToDoHeader>
			<Day>{todayWeek}요일</Day>
			<MonthDate>
				{todayMonth}&nbsp;
				{todayDate}일
			</MonthDate>
			{documents &&
				documents.map((item: DocumentData, index: number) => {
					return (
						<TodoList key={index} title={item.title} content={item.content} />
					);
				})}

			{!isMenuToggled && <MenuNav toggle={toggleMenu} logout={handleLogOut} />}

			{listModalState && <ToDoCreate />}

			{calModalState && <Calender />}
		</>
	);
};

export default TodoPage;
