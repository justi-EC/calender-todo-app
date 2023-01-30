import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { dateActions } from '../../store/dateSlice';

interface ContainerProps {
	sameMonth: boolean;
	sameDay: boolean;
	clickDay: boolean;
}

interface Props {
	day: Date;
}

const Container = styled.div<ContainerProps>`
	border: 1px solid lightgray;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: lightgray;
		cursor: pointer;
	}

	p {
		padding: 5px;
		color: ${({ sameMonth }) => (sameMonth ? 'black' : 'lightgray')};
		${({ sameDay }) =>
			sameDay
				? css`
						font-weight: bold;
						color: var(--primary-color-700);
				  `
				: css``}
		${({ clickDay }) =>
			clickDay
				? css`
						font-weight: bold;

						color: #ff8295;
				  `
				: css``}
	}
`;

const AllDay = ({ day }: Props) => {
	const clickedDate = useSelector((state: RootState) => state.date.click);
	const nowDate = useSelector((state: RootState) => state.date.now);
	const dispatch = useDispatch();

	const nowTime = new Date();
	const sameMonth = nowDate.getMonth() === day.getMonth();
	const sameDay =
		nowTime.getFullYear() === day.getFullYear() &&
		nowTime.getMonth() === day.getMonth() &&
		nowTime.getDate() === day.getDate();

	const clickDay: boolean = clickedDate
		? clickedDate.getFullYear() === day.getFullYear() &&
		  clickedDate.getMonth() === day.getMonth() &&
		  clickedDate.getDate() === day.getDate()
		: false;

	const clickDate = () => {
		dispatch(dateActions.clickedDate(day));
	};

	return (
		<Container
			onClick={clickDate}
			sameMonth={sameMonth}
			sameDay={sameDay}
			clickDay={clickDay}
		>
			<p>{day.getDate()}</p>
		</Container>
	);
};

export default AllDay;
