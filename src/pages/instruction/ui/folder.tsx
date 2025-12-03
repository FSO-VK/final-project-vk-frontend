import { IconStyle, NakedArrowDownIcon } from '@/shared/ui';
import { Show, splitProps, type JSX } from 'solid-js';
import './folder.css';

export interface FolderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  caption: string;
  opened?: boolean;
  onOpenClick?: () => void;
}

export function Folder(props: FolderProps) {
  const [classProp, otherProps] = splitProps(props, ['class']);

  return (
    <div class={`folder folder_standard ${classProp.class}`} {...otherProps}>
      <div class="folder__header" onClick={() => otherProps.onOpenClick?.()}>
        <div class="folder__caption">{otherProps.caption}</div>
        <button class="folder__open-button" type="button">
          <NakedArrowDownIcon
            iconStyle={IconStyle.Active}
            elementClass={`folder__icon ${otherProps.opened ? 'folder__icon_opened' : ''}`}
          />
        </button>
      </div>
      <Show when={otherProps.opened}>{otherProps.children}</Show>
    </div>
  );
}
