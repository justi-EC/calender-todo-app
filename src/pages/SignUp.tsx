import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Visibility } from '@styled-icons/material-outlined/Visibility';
import { VisibilityOff } from '@styled-icons/material/VisibilityOff';
import { Link } from 'react-router-dom';
import {
	Container,
	SubContainer,
	Subtitle,
	SignUpInput,
	SignUpButton,
	IconButton,
	HelperText,
	PrimaryText,
} from '../style/authStyle';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { appAuth } from '../firebase/config';
import { authActions } from '../store/authSlice';

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
					{/* 아이콘 */}
					<Subtitle>만나서 반가워요!</Subtitle>

					<SubContainer>
						<label htmlFor="name">이름</label>
						<SignUpInput
							type="text"
							id="name"
							onChange={handleNickName}
							validProps={isNickNameValid}
							isActive={{ emptyEmail, emptyPwd, emptyNickName }}
							placeholder="2글자 이상"
						/>

						<label htmlFor="email">이메일 주소</label>
						<SignUpInput
							type="email"
							id="email"
							onChange={handleData}
							validProps={isEmailValid}
							isActive={{ emptyEmail, emptyPwd, emptyNickName }}
							placeholder="example@example.com"
						/>

						<label htmlFor="password">비밀번호</label>
						<SignUpInput
							type={visiblePwd ? 'text' : 'password'}
							value={password}
							id="password"
							onChange={handleData}
							validProps={isPasswordValid}
							isActive={{ emptyEmail, emptyPwd, emptyNickName }}
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

					<SignUpButton
						type="submit"
						onClick={onSubmitHandler}
						disabled={!formIsValid}
						isActive={{ emptyEmail, emptyPwd, emptyNickName }}
					>
						회원가입
					</SignUpButton>

					<HelperText isWrong={isWrong}>이미 존재하는 계정입니다.</HelperText>

					<Link to="/" style={{ textDecoration: 'none' }}>
						<PrimaryText>로그인 페이지로 이동</PrimaryText>
					</Link>
				</Container>
			</main>
		</>
	);
};

export default SignUp;
