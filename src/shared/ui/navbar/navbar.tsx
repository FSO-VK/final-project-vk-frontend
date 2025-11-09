import './navbar.css';
import backIcon from './back-icon.svg';
import { createSignal, For, Show } from 'solid-js';
import { clickOutside, Dropdown } from '../dropdown/dropdown';
import { DotsIcon, type IconComponent, IconStyle } from '../icons';
import { Divider } from '../divider/divider';
import { JSX } from 'solid-js/h/jsx-runtime';

export interface NavbarProps {
  showBackButton?: boolean;
  // url where go back button points
  onBackButtonClick?: () => void;
  // BEM element class
  elementClass?: string;
  // Title
  title?: string;

  showDropdownMenu?: boolean;
  dropdownMenuItems?: MenuItem[];
}

// Must be there in order to typescript not tree-shake directive
// see https://docs.solidjs.com/reference/jsx-attributes/use#avoiding-tree-shaking
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
clickOutside;

export function Navbar(props: NavbarProps) {
  const [isDropdownShown, setIsDropdownShown] = createSignal(false);
  let openDropdownButtonRef!: HTMLButtonElement;

  return (
    <nav class={`navbar navbar_brand ${props.elementClass}`}>
      <Show when={props.showBackButton}>
        <button onClick={() => props.onBackButtonClick?.()} class="navbar__back-button">
          <img class="navbar__back-icon" alt="кнопка назад" src={backIcon} />
          <span class="navbar__back-text">Назад</span>
        </button>
      </Show>
      <div class="navbar__header">{props.title ?? ''}</div>
      <Show when={!props.showDropdownMenu && (props.dropdownMenuItems?.length ?? 0) > 0}>
        <Dropdown
          class="navbar__dropdown-menu dropdown-menu"
          triggerElement={
            <button
              ref={openDropdownButtonRef}
              type="button"
              class="dropdown-menu__trigger"
              onClick={() => {
                setIsDropdownShown(!isDropdownShown());
              }}
            >
              <DotsIcon iconStyle={IconStyle.Active} elementClass="dropdown-menu__trigger-icon" />
            </button>
          }
          contentElement={
            <div
              use:clickOutside={(el: Node) => {
                if (!openDropdownButtonRef.contains(el)) {
                  setIsDropdownShown(false);
                }
              }}
            >
              <Menu class="dropdown-menu__content" items={props.dropdownMenuItems ?? []} />
            </div>
          }
          showDropdown={isDropdownShown()}
        />
      </Show>
    </nav>
  );
}

export interface MenuItem {
  icon: IconComponent;
  text: string;
  onClick?: () => void;
}

interface MenuContentProps extends JSX.HTMLAttributes<HTMLMenuElement> {
  items: MenuItem[];
  class?: string;
}

function Menu(props: MenuContentProps) {
  return (
    <menu class={`menu menu_brand ${props.class ?? ''}`}>
      <For each={props.items}>
        {(item, idx) => {
          return (
            <>
              <li class="menu__item">
                <button onClick={item.onClick} class="menu__item-button">
                  <item.icon iconStyle={IconStyle.Active} elementClass="menu__item-icon" />
                  <span class="menu__item-text">{item.text}</span>
                </button>
              </li>
              <Show when={idx() < props.items.length - 1}>
                <Divider />
              </Show>
            </>
          );
        }}
      </For>
    </menu>
  );
}
