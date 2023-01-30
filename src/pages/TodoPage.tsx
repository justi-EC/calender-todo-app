import { ToDoHeader, ToDoTitle, IconButton } from '../style/mainStyle';
import { Menu } from '@styled-icons/boxicons-regular/Menu';
import { useState, useEffect } from 'react';
import MenuNav from './MenuNav';
import ToDoCreate from '../components/TodoList/ToDoCreate';
import { appFireStore } from '../firebase/config';
import TodoList from './TodoList';
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import Calender from '../components/Calender/Calender';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const TodoPage = () => {
	const [isMenuToggled, setIsMenuToggled] = useState(false);
	const { logout } = useLogout();
	const navigate = useNavigate();
	const calModalState = useSelector(
		(state: RootState) => state.handleModal.cal
	);
	const listModalState = useSelector(
		(state: RootState) => state.handleModal.list
	);
	const [documents, setDocuments] = useState<DocumentData>();

	const transaction = 'Todos';

	const toggleMenu = () => {
		setIsMenuToggled(!isMenuToggled);
	};

	const handleLogOut = () => {
		logout();
		navigate('/');
	};

	const getData = async () => {
		const res = await getDocs(collection(appFireStore, transaction));
		const newData = res.docs.map((doc) => doc.data());
		setDocuments(newData);
	};

	useEffect(() => {
		getData();
	}, [listModalState]);

	console.log(documents);

	return (
		<>
			<ToDoHeader>
				<ToDoTitle>나의 할 일</ToDoTitle>
				<IconButton onClick={toggleMenu}>
					<Menu width={80} height={80} />
				</IconButton>
			</ToDoHeader>

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
