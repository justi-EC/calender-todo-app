import { Container, Subtitle } from '../style/authStyle';
import { Link } from 'react-router-dom';

const SignUpSuccess = () => {
	return (
		<Container>
			<Subtitle> 회원가입이 성공적으로 완료되었습니다.</Subtitle>
			<Link to="/" style={{ textDecoration: 'none' }}>
				<p>로그인 페이지로 이동</p>
			</Link>
		</Container>
	);
};

export default SignUpSuccess;
