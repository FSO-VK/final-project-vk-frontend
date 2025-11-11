import { SomethingBadScreen } from '@/features/something_bad';

export function NotFoundPage() {
  return (
    <main class="not-found-page">
      <SomethingBadScreen reason="Ресурс не найден (HTTP 404)" />
    </main>
  );
}
