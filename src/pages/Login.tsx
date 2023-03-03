import { useState } from 'react';
import { Visibility } from '@styled-icons/material-outlined/Visibility';
import { VisibilityOff } from '@styled-icons/material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { appAuth } from '../firebase/config';
import styled from 'styled-components';
import { authActions } from '../store/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
	const checkEmail =
		/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,6}$/i;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [visiblePwd, setVisiblePwd] = useState(false);
	const [isWrong, setIsWrong] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	let isEmailValid = checkEmail.test(email);
	let isPasswordValid = password.length > 7;

	const emptyEmail = email.trim() === '';
	const emptyPwd = password.trim() === '';

	let formIsValid = false;

	if (isEmailValid && isPasswordValid) {
		formIsValid = true;
	}

	const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const logininputType = e.target.type;
		logininputType === 'email' && setEmail(e.target.value);
		logininputType === 'password' && setPassword(e.target.value);
		logininputType === 'text' && setPassword(e.target.value);
	};

	const handleClickShowPwd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setVisiblePwd((prev) => !prev);
	};

	const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailAndPassword(appAuth, email, password);
			const user = res.user;
			dispatch(authActions.login(user));
			navigate('/todopage');
		} catch (error: any) {
			setIsWrong(true);
		}
	};

	return (
		<section>
			<Container>
				<Subtitle>나만의 투두리스트</Subtitle>
				<form>
					<SubContainer>
						<label htmlFor="email">이메일 아이디</label>
						<LoginInput
							type="email"
							id="email"
							value={email}
							onChange={handleData}
							validProps={isEmailValid}
							isActive={{ emptyEmail, emptyPwd }}
							placeholder="example@example.com"
						/>

						<label htmlFor="password">비밀번호</label>
						<LoginInput
							type={visiblePwd ? 'text' : 'password'}
							id="password"
							value={password}
							onChange={handleData}
							validProps={isPasswordValid}
							isActive={{ emptyEmail, emptyPwd }}
							placeholder="8글자 이상 입력"
						/>
						<IconButton onClick={handleClickShowPwd}>
							{visiblePwd ? (
								<Visibility width={30} height={30} />
							) : (
								<VisibilityOff width={30} height={30} />
							)}
						</IconButton>
					</SubContainer>

					<LoginButton
						type="submit"
						onClick={onSubmitHandler}
						disabled={!formIsValid}
						isActive={{ emptyEmail, emptyPwd }}
					>
						로그인
					</LoginButton>
				</form>

				<HelperText isWrong={isWrong}>
					아이디와 비밀번호를 확인해주세요.
				</HelperText>

				<Link to="/signup" style={{ textDecoration: 'none' }}>
					<h1>회원가입하러 가기</h1>
				</Link>
			</Container>
		</section>
	);
};

export default Login;

type LoginType = {
	emptyEmail: boolean;
	emptyPwd: boolean;
};

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;

	label {
		margin-left: 0.8rem;
		color: ${({ theme }) => theme.colors.primaryBlue700};
	}

	h1 {
		color: ${({ theme }) => theme.colors.primaryBlue700};
	}
`;

export const Subtitle = styled.div`
	font-size: 2.5rem;
	font-weight: 500;
	margin-bottom: 1rem;
	color: ${({ theme }) => theme.colors.primaryBlue700};
`;

export const SubContainer = styled.div`
	width: 20rem;

	border: 1px solid ${({ theme }) => theme.colors.primaryBlue300};
	border-radius: 50px;
	padding-top: 1.8rem;
`;

export const Input = styled.input`
	font-size: 1rem;
	padding: 0.5rem;
	margin: 0.5rem;
	width: 95%;
	border-radius: 1.2rem;
	&::placeholder {
		color: ${({ theme }) => theme.colors.gray100};
	}
`;

export const Button = styled.button`
	width: 20rem;
	padding: 0.5em;
	background-color: ${({ theme }) => theme.colors.primaryBlue700};
	border: 1px solid white;
	margin: 2rem 0 0.5rem 0;
	border-radius: 1.2rem;
	color: white;
	transition-duration: 0.3s;
`;

const LoginInput = styled(Input)<{
	validProps: boolean;
	isActive: LoginType;
}>`
	background-color: ${({ validProps, isActive, theme }) =>
		validProps || (isActive.emptyEmail && isActive.emptyPwd)
			? theme.colors.correct
			: theme.colors.incorrect};
`;

const LoginButton = styled(Button)<{ isActive: LoginType }>`
	${({ disabled, isActive, theme }) =>
		(disabled || isActive.emptyEmail || isActive.emptyPwd) &&
		`
      background-color: white;
      border: 1px solid ${theme.colors.gray100};
      color: ${theme.colors.gray100};
    `};

	${({ theme, disabled, isActive }) =>
		(!disabled || !isActive.emptyEmail || !isActive.emptyPwd) &&
		`
      &:hover {
        background-color: ${theme.colors.primaryBlue800};
      }
    `};
`;

export const IconButton = styled.button`
	position: relative;
	bottom: 2.4rem;
	left: 17rem;
	opacity: 40%;
`;

export const HelperText = styled.h2<{ isWrong: boolean }>`
	color: ${({ theme }) => theme.colors.error};
	margin: 0.7rem;
	margin-bottom: 1rem;
	visibility: ${({ isWrong }) => (isWrong ? 'visible' : 'hidden')};
`;
