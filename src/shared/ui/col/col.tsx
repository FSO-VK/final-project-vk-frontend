import type { JSXElement } from 'solid-js';

export interface ColProps {
  children?: JSXElement | JSXElement[];
  size: number;
}

export function Col(props: ColProps) {
  return (
    <div class="col" style={{ width: `calc(var(--col-width) * ${props.size})` }}>
      {props.children ?? <div aria-hidden="true" />}
    </div>
  );
}
