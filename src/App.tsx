import { ThemeProvider } from 'styled-components';
import Router from './router';
import GlobalStyle from './style/globalStyle';
import theme from './style/theme';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Router />
			</ThemeProvider>
		</Provider>
	);
}

export default App;
