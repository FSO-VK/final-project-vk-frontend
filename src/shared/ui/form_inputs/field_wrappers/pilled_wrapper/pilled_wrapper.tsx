import './pilled_wrapper.css';
import { For, type ParentProps, Show } from 'solid-js';

export interface PilledWrapperProps extends ParentProps {
  pills: string[];
  onPillClick?: (pill: string) => void;
}

export function PilledWrapper(props: PilledWrapperProps) {
  return (
    <div class="pilled-wrapper">
      <Show when={props.pills.length != 0}>
        <div class="pilled-wrapper__autosuggestions">
          <For each={props.pills}>
            {(pill) => {
              return (
                <span
                  class="pilled-wrapper__pill pilled-wrapper__pill_brand"
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
