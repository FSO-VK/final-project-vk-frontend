import type { JSXElement } from 'solid-js';

export interface ColProps {
  children?: JSXElement | JSXElement[];
  size: number;
}

function Col(props: ColProps) {
  return (
    <div class="col" style={{ width: `calc(var(--col-width) * ${props.size})` }}>
      {props.children ?? <div aria-hidden="true"></div>}
    </div>
  );
}

export default Col;
