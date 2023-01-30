import React, { useState } from 'react';
import { Visibility } from '@styled-icons/material-outlined/Visibility';
import { VisibilityOff } from '@styled-icons/material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { appAuth } from '../firebase/config';
import { authActions } from '../store/authSlice';
import {
	Container,
	SubContainer,
	Label,
	Subtitle,
	LoginInput,
	LoginButton,
	IconButton,
	HelperText,
	ChangePageText,
} from '../style/authStyle';
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
				{/* 아이콘 */}
				<Subtitle>나만의 투두리스트</Subtitle>
				<form>
					<SubContainer>
						<Label htmlFor="email">이메일 아이디</Label>
						<LoginInput
							type="email"
							id="email"
							value={email}
							onChange={handleData}
							validProps={isEmailValid}
							isActive={{ emptyEmail, emptyPwd }}
							placeholder="example@example.com"
						/>

						<Label htmlFor="password">비밀번호</Label>
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
					<ChangePageText>회원가입하러 가기</ChangePageText>
				</Link>
			</Container>
		</section>
	);
};

export default Login;
