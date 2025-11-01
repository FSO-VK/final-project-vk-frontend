import './pilled_input.css';
import { For, type ParentProps, Show } from 'solid-js';

export interface PilledWrapperProps extends ParentProps {
  pills: string[];
  onPillClick?: (pill: string) => void;
}

export function PilledWrapper(props: PilledWrapperProps) {
  return (
    <div class="pilled-wrapper">
      <Show when={props.pills.length != 0}>
        <div class="pilled-input__autosuggestions">
          <For each={props.pills}>
            {(pill) => {
              return (
                <span
                  class="pilled-input__pill pilled-input__pill_brand"
                  onClick={() => props.onPillClick?.(pill)}
                >
                  {pill}
                </span>
              );
            }}
          </For>
        </div>
      </Show>
      {props.children}
    </div>
  );
}
