import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primaryBlue1000: string;
			primaryBlue900: string;
			primaryBlue800: string;
			primaryBlue700: string;
			primaryBlue500: string;
			primaryBlue300: string;
			primaryBlue100: string;
			gray500: string;
			gray300: string;
			gray100: string;
			correct: string;
			incorrect: string;
			error: string;
		};
	}
}
