import './p.css';

export interface PProps {
  text?: string;
}

export function P({ text }: PProps) {
  return <p class="paragraph">{text}</p>;
}
