import type { JSXElement } from 'solid-js';
import { For } from 'solid-js';
import './list.css';

export interface ListProps {
  items?: JSXElement[];
}

function List(props: ListProps) {
  return (
    <ul class="list">
      <For each={props.items}>{(item, _) => <li class="list__item">{item}</li>}</For>
    </ul>
  );
}

export default List;
