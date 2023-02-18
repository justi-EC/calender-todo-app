import { Link } from 'react-router-dom';
import { Container, Subtitle } from './Login';

const SignUpSuccess = () => {
	return (
		<Container>
			<Subtitle> 회원가입이 성공적으로 완료되었습니다.</Subtitle>
			<Link to="/">
				<h1>로그인 페이지로 이동</h1>
			</Link>
		</Container>
	);
};

export default SignUpSuccess;
