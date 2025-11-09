import { type Accessor, type JSXElement, onCleanup, Show, splitProps } from 'solid-js';
import { type JSX } from 'solid-js';
import './dropdown.css';

export interface DropdownProps extends JSX.HTMLAttributes<HTMLDivElement> {
  triggerElement: JSXElement;
  contentElement: JSXElement;
  showDropdown?: boolean;
}

// Dropdown is a headless component used to create
// dropdown elements
export function Dropdown(props: DropdownProps) {
  const [usedProps, otherProps] = splitProps(props, [
    'class',
    'triggerElement',
    'contentElement',
    'showDropdown',
  ]);
  return (
    <div class={`dropdown ${usedProps.class ?? ''}`} {...otherProps}>
      {usedProps.triggerElement}
      <Show when={usedProps.showDropdown}>{usedProps.contentElement}</Show>
    </div>
  );
}

// Helper binding to detect click outside component
export function clickOutside(el: Element, value: Accessor<(target: Node) => void>) {
  const onClick = (e: MouseEvent) => !el.contains(e.target as Node) && value()(e.target as Node);

  document.body.addEventListener('click', onClick);
  onCleanup(() => document.body.removeEventListener('click', onClick));
}

// For typescript usage of the helper, we need to extend JSX namespace
// see https://docs.solidjs.com/reference/jsx-attributes/use
declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface DirectiveFunctions {
      clickOutside: typeof clickOutside;
    }
  }
}
