import { For } from 'solid-js';
import { A } from '@solidjs/router';
import './tabbar.css';
import { IconStyle, type IconComponent } from '../icons/icon';

export interface TabbarOption {
  label: string;
  href?: string;
  icon: IconComponent;
}

export interface TabbarProps {
  options?: TabbarOption[];
  activeOption: number;
  elementClass?: string;
}

export function Tabbar(props: TabbarProps) {
  return (
    <nav class="tabbar">
      <ul class="tabbar__list">
        <For each={props.options}>
          {(item, idx) => (
            <li class="tabbar__option">
              <A
                href={item.href ?? '/'}
                class={`tabbar__link tabbar__link_${props.activeOption === idx() ? '' : 'in'}active ${props.elementClass ?? ''}`}
              >
                {
                  <item.icon
                    elementClass={'tabbar__option-icon'}
                    iconStyle={props.activeOption === idx() ? IconStyle.Active : IconStyle.Inactive}
                  />
                }
                <div class="tabbar__option-label">{item.label}</div>
              </A>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
