import styled from 'styled-components';
interface Props {
	weekName: string;
}

const WeekBox = ({ weekName }: Props) => {
	return (
		<Container>
			<p>{weekName}</p>
		</Container>
	);
};

export default WeekBox;

const Container = styled.div`
	background-color: var(--primary-color-700);
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-weight: bold;
`;
