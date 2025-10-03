import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './index.css';
import App from './routes/App.tsx';
import { NameProvider } from './provider/NameProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<NameProvider>
		<HashRouter>
			<App />
		</HashRouter>
	</NameProvider>,
);
