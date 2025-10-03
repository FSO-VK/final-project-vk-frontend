/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './components/app/app.tsx';

const root = document.getElementById('root');

render(() => <App />, root!);
