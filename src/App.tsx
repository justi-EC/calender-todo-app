import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import TodoPage from './pages/ToDoPage';
import SignUpSuccess from './pages/SignUpSuccess';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/todopage" element={<TodoPage />} />
				<Route path="/signupsuccess" element={<SignUpSuccess />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
