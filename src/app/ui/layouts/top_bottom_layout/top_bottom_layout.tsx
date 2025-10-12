import type { JSXElement } from 'solid-js';
import Header from '../header/header';
import './top_bottom_layout.css';

export interface TopBottomLayoutProps {
  children?: JSXElement[] | JSXElement;
}

export function TopBottomLayout(props: TopBottomLayoutProps) {
  return (
    <>
      <Header />
      <main class="page-container">{props.children}</main>
    </>
  );
}
