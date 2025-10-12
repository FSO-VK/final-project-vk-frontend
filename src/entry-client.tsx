/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './app';

const root = document.getElementById('root');
root!.innerHTML = '';

render(() => <App />, root!);
