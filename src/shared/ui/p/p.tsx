import type { ParentComponent } from 'solid-js';
import './p.css';

export const P: ParentComponent = (props) => {
  return <p class="paragraph">{props.children}</p>;
};
