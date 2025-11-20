import { LoaderSpinner } from './loader_spinner';
import { type JSX } from 'solid-js';

import './centered_loader_spinner.css';

export function CenteredLoaderSpinner(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class="centered-wrapper centered-wrapper_normal-size">
      <LoaderSpinner {...props} />
    </div>
  );
}
