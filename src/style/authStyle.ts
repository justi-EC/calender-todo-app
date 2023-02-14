import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 90vh;

	label {
		margin-left: 0.8rem;
		color: var(--primary-color-500);
	}
`;

const PrimaryText = styled.p`
	color: var(--primary-color-700);
`;

const SubContainer = styled.div`
	width: 20rem;
	border: 1px solid var(--primary-color-300);
	border-radius: 50px;
	padding-top: 1.8em;
`;

const Subtitle = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 1rem;
	color: var(--primary-color-700);
`;

type SignUpType = {
	emptyEmail: boolean;
	emptyPwd: boolean;
	emptyNickName: boolean;
};

type LoginType = {
	emptyEmail: boolean;
	emptyPwd: boolean;
};

const Input = styled.input`
	font-size: 1rem;
	padding: 0.5rem;
	margin: 0.5rem;
	width: 18rem;
	border: none;
	border-radius: 1.2rem;
	&::placeholder {
		color: lightgray;
	}
`;

const SignUpInput = styled(Input)<{
	validProps: boolean;
	isActive: SignUpType;
}>`
	background-color: ${(props) =>
		props.validProps ||
		(props.isActive.emptyEmail &&
			props.isActive.emptyPwd &&
			props.isActive.emptyNickName)
			? '#e8f0fd'
			: '#ffebee'};
`;

const LoginInput = styled(Input)<{ validProps: boolean; isActive: LoginType }>`
	background-color: ${(props) =>
		props.validProps || (props.isActive.emptyEmail && props.isActive.emptyPwd)
			? '#e8f0fd'
			: '#ffebee'};
`;

const Button = styled.button`
	width: 400px;
	padding: 0.5em;
	background-color: var(--primary-color-700);
	border: 1px solid white;
	margin: 2rem 0 0.5rem 0;
	border-radius: 1.2rem;
	color: white;
	transition-duration: 0.3s;

	cursor: pointer;
`;

const SignUpButton = styled(Button)<{ isActive: SignUpType }>`
	${(props) =>
		(props.disabled ||
			props.isActive.emptyEmail ||
			props.isActive.emptyPwd ||
			props.isActive.emptyNickName) &&
		`
		background-color:white;
		border:1px solid lightgray;
		border-radius: 1.2rem;
		color:lightgray;
		`};
	${(props) =>
		!props.disabled &&
		!props.isActive.emptyEmail &&
		!props.isActive.emptyPwd &&
		!props.isActive.emptyNickName &&
		`
		&:hover{
			background-color : var(--primary-color-900);
		}
	`};
	font-family: var(--font-NotoSansKR-Regular);
`;

const LoginButton = styled(Button)<{ isActive: LoginType }>`
	${(props) =>
		(props.disabled || props.isActive.emptyEmail || props.isActive.emptyPwd) &&
		`
	background-color:white;
	border:1px solid lightgray;
	border-radius: 1.2rem;
	color:lightgray;
	`};
	${(props) =>
		(!props.disabled ||
			!props.isActive.emptyEmail ||
			!props.isActive.emptyPwd) &&
		`
		&:hover{
			background-color : var(--primary-color-900);
		}
	`};

	font-family: var(--font-NotoSansKR-Regular);
`;

const IconButton = styled.button`
	position: relative;
	bottom: 2.6rem;
	left: 17rem;
	border: none;
	cursor: pointer;
	background-color: transparent;
	opacity: 40%;
`;

const HelperText = styled.p<{ isWrong: boolean }>`
	color: #ee4e45;
	margin: 0.7rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	display: ${(props) => (props.isWrong ? 'block' : 'none')};
`;

export {
	Container,
	SubContainer,
	Subtitle,
	SignUpInput,
	LoginInput,
	LoginButton,
	SignUpButton,
	Button,
	IconButton,
	HelperText,
	PrimaryText,
};
