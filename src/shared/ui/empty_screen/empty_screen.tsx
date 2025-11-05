import { EmptyIcon } from '../icons/empty';
import './empty_screen.css';

export function EmptyScreen() {
  return (
    <div class="empty-screen">
      <EmptyIcon elementClass="empty-screen__icon" />
      <span class="empty-screen__caption">Пока пусто</span>
    </div>
  );
}
