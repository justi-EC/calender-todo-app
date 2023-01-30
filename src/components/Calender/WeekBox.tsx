import styled from 'styled-components';

interface Props {
	weekName: string;
}

const Container = styled.div`
	background-color: var(--primary-color-800)
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-weight: bold;
`;

const WeekBox = ({ weekName }: Props) => {
	return (
		<Container>
			<p>{weekName}</p>
		</Container>
	);
};

export default WeekBox;
