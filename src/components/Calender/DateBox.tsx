import styled from 'styled-components';
import WeekBox from './WeekBox';
import AllDay from './AllDay';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { weekNames } from './Today';

const monthList = (nowDate: Date) => {
	const result: Date[] = [];
	const nowYear = nowDate.getFullYear();
	const nowMonth = nowDate.getMonth();

	const dayOneWeek = new Date(nowYear, nowMonth, 1).getDay();
	const dayLastWeek = new Date(nowYear, nowMonth + 1, 0).getDay();

	const prevMonthEnd = new Date(nowYear, nowMonth, 0).getDate();
	const nowMonthEnd = new Date(nowYear, nowMonth + 1, 0).getDate();

	for (let i = dayOneWeek - 1; i >= 0; i--) {
		result.push(new Date(nowYear, nowMonth - 1, prevMonthEnd - i));
	}

	for (let i = 1; i <= nowMonthEnd; i++) {
		result.push(new Date(nowYear, nowMonth, i));
	}

	for (let i = 1; i < 7 - dayLastWeek; i++) {
		result.push(new Date(nowYear, nowMonth + 1, i));
	}
	return result;
};

const DateBox = () => {
	const nowDate = useSelector((state: RootState) => state.date.now);

	const allDay: Date[] = monthList(nowDate);

	return (
		<Container>
			{weekNames.map((week) => {
				return <WeekBox key={week} weekName={week} />;
			})}
			{allDay.map((day: Date) => {
				return <AllDay key={day.getTime()} day={day} />;
			})}
		</Container>
	);
};

export default DateBox;

const Container = styled.div`
	height: 80%;
	flex: 1;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
`;
