import type { JSXElement } from 'solid-js';
import { For } from 'solid-js';
import './list.css';

export interface ListProps {
  items?: JSXElement[];
  elementClass?: string;
  fallback?: JSXElement;
}

export function List(props: ListProps) {
  return (
    <ul class={`list ${props.elementClass ?? ''}`}>
      <For each={props.items} fallback={props.fallback}>
        {(item) => <li class="list__item">{item}</li>}
      </For>
    </ul>
  );
}
