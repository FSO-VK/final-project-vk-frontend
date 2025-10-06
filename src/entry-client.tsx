/* @refresh reload */
import './index.ts';
import { render } from 'solid-js/web';
import App from './components/app/app.tsx';

const root = document.getElementById('root');
root!.innerHTML = '';

render(() => <App />, root!);
