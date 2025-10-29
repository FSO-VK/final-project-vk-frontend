import { useMedicationStore } from '@/entities/medication';
import { MedicationCard } from '@/entities/medication';
import { List } from '@/shared/ui';
import { createAsync } from '@solidjs/router';
import './medication_list.css';
import { Suspense } from 'solid-js';

export function MedicationsListPage() {
  const medStore = useMedicationStore();

  const medications = createAsync(medStore.allMedications);
  return (
    <main class="medications-list-page">
      <Suspense fallback={<div>Загружаем...</div>}>
        <List
          elementClass="medication-list-page__list"
          items={medications()?.map((m) => (
            <MedicationCard medication={m} />
          ))}
          fallback={<div>Кажется, ничего нет</div>}
        />
      </Suspense>
    </main>
  );
}
