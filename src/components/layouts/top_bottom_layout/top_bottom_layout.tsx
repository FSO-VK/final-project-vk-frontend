import type { JSXElement } from 'solid-js';
import Header from '../header/header.tsx';
import './top_bottom_layout.css';

export interface TopBottomLayoutProps {
  children?: JSXElement[] | JSXElement;
}

function TopBottomLayout(props: TopBottomLayoutProps) {
  return (
    <>
      <Header />
      <main class="page-container">{props.children}</main>
    </>
  );
}

export default TopBottomLayout;
