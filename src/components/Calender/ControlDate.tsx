import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { dateActions } from '../../store/dateSlice';

const ControlDate = () => {
	const nowDate = useSelector((state: RootState) => state.date.now);
	const dispatch = useDispatch();

	const changeYear = (change: number) => {
		const date = new Date(nowDate.getTime());
		date.setFullYear(date.getFullYear() + change);
		dispatch(dateActions.nowDate(date));
	};

	const changeMonth = (change: number) => {
		const date = new Date(nowDate.getTime());
		date.setMonth(date.getMonth() + change);
		dispatch(dateActions.nowDate(date));
	};

	return (
		<Container>
			<BtnBox>
				<button onClick={() => changeYear(-1)}>{`<<`}</button>
				<button onClick={() => changeMonth(-1)}>{`<`}</button>
			</BtnBox>
			<CurrentDate>{`${nowDate.getFullYear()}.${
				nowDate.getMonth() + 1
			}`}</CurrentDate>
			<BtnBox>
				<button onClick={() => changeMonth(1)}>{`>`}</button>
				<button onClick={() => changeYear(1)}>{`>>`}</button>
			</BtnBox>
		</Container>
	);
};

export default ControlDate;

const Container = styled.div`
	height: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BtnBox = styled.div`
	button {
		width: 30px;
		margin: 30px;
		font-weight: bold;

		&:hover {
			background-color: ${({ theme }) => theme.colors.gray100};
			border-radius: 30px;
		}
		&:active {
			background-color: ${({ theme }) => theme.colors.gray300};
		}
	}
`;

const CurrentDate = styled.h1`
	font-size: 30px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.primaryBlue800};
`;
