import type { ParentComponent } from 'solid-js';
import './fullscreen_fixed.css';

// FullscreenFixedLayout is a fullscreen layout, bouded by horizontal size on desktops
export const FullscreenFixedLayout: ParentComponent = (props) => {
  return (
    <div class="fullscreen-fixed" aria-hidden="true">
      {props.children}
    </div>
  );
};
