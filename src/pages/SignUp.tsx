import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Visibility } from '@styled-icons/material-outlined/Visibility';
import { VisibilityOff } from '@styled-icons/material/VisibilityOff';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { appAuth } from '../firebase/config';
import { authActions } from '../store/authSlice';
import {
	Button,
	Container,
	HelperText,
	IconButton,
	Input,
	SubContainer,
	Subtitle,
} from './Login';

const SignUp = () => {
	const checkEmail =
		/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,6}$/i;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [nickName, setNickName] = useState('');
	const [visiblePwd, setVisiblePwd] = useState(false);
	const [isWrong, setIsWrong] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	let isEmailValid = checkEmail.test(email);
	let isPasswordValid = password.length > 7;
	let isNickNameValid = nickName.length > 1;

	const emptyEmail = email.trim() === '';
	const emptyPwd = password.trim() === '';
	const emptyNickName = nickName.trim() === '';

	let formIsValid = false;

	if (isEmailValid && isPasswordValid && isNickNameValid) {
		formIsValid = true;
	}

	const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const signUpinputType = e.target.type;
		signUpinputType === 'email' && setEmail(e.target.value);
		signUpinputType === 'password' && setPassword(e.target.value);
		signUpinputType === 'text' && setPassword(e.target.value);
	};

	const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickName(e.target.value);
	};

	const handleClickShowPwd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setVisiblePwd((prev) => !prev);
	};

	const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const res = await createUserWithEmailAndPassword(
				appAuth,
				email,
				password
			);
			const user = res.user;
			updateProfile(user, { displayName: nickName });
			dispatch(authActions.login(user));
			navigate('/signupsuccess');
		} catch (error: any) {
			setIsWrong(true);
		}
	};

	return (
		<>
			<main>
				<Container>
					<Subtitle>????????? ????????????!</Subtitle>

					<SubContainer>
						<label htmlFor="name">??????</label>
						<SignUpInput
							type="text"
							id="name"
							onChange={handleNickName}
							validProps={isNickNameValid}
							isActive={{ emptyEmail, emptyPwd, emptyNickName }}
							placeholder="2?????? ??????"
						/>

						<label htmlFor="email">????????? ??????</label>
						<SignUpInput
							type="email"
							id="email"
							onChange={handleData}
							validProps={isEmailValid}
							isActive={{ emptyEmail, emptyPwd, emptyNickName }}
							placeholder="example@example.com"
						/>

						<label htmlFor="password">????????????</label>
						<SignUpInput
							type={visiblePwd ? 'text' : 'password'}
							value={password}
							id="password"
							onChange={handleData}
							validProps={isPasswordValid}
							isActive={{ emptyEmail, emptyPwd, emptyNickName }}
							placeholder="8?????? ?????? ??????"
						/>
						<IconButton onClick={handleClickShowPwd}>
							{visiblePwd ? (
								<Visibility width={30} height={30} />
							) : (
								<VisibilityOff width={30} height={30} />
							)}
						</IconButton>
					</SubContainer>

					<SignUpButton
						type="submit"
						onClick={onSubmitHandler}
						disabled={!formIsValid}
						isActive={{ emptyEmail, emptyPwd, emptyNickName }}
					>
						????????????
					</SignUpButton>

					<HelperText isWrong={isWrong}>?????? ???????????? ???????????????.</HelperText>

					<Link to="/" style={{ textDecoration: 'none' }}>
						<h1>????????? ???????????? ??????</h1>
					</Link>
				</Container>
			</main>
		</>
	);
};

export default SignUp;

type SignUpType = {
	emptyEmail: boolean;
	emptyPwd: boolean;
	emptyNickName: boolean;
};

const SignUpInput = styled(Input)<{
	validProps: boolean;
	isActive: SignUpType;
}>`
	background-color: ${({ validProps, isActive, theme }) =>
		validProps ||
		(isActive.emptyEmail && isActive.emptyPwd && isActive.emptyNickName)
			? theme.colors.correct
			: theme.colors.incorrect};
`;

const SignUpButton = styled(Button)<{ isActive: SignUpType }>`
	${({ disabled, isActive, theme }) =>
		(disabled ||
			isActive.emptyEmail ||
			isActive.emptyPwd ||
			isActive.emptyNickName) &&
		`
		background-color:white;
		border:1px solid ${theme.colors.gray100};
		border-radius: 1.2rem;
		color:${theme.colors.gray100};
		`};
	${({ theme, disabled, isActive }) =>
		!disabled &&
		!isActive.emptyEmail &&
		!isActive.emptyPwd &&
		!isActive.emptyNickName &&
		`
		&:hover{
			background-color : ${theme.colors.primaryBlue800};
		}
	`};
`;
