import type { JSXElement } from "solid-js";
import Header from "../header/header.tsx";

export interface TopBottomLayoutProps {
    children?: JSXElement[] | JSXElement
}

function TopBottomLayout(props: TopBottomLayoutProps) {
    return (<>
        <Header />
        {props.children}
    </>);
}

export default TopBottomLayout;
