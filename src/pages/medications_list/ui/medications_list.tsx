import { useMedicationStore } from '@/entities/medication';
import { MedicationCard } from '@/entities/medication';
import { BubblePlusIcon, IconStyle, List } from '@/shared/ui';
import { A, createAsync, useNavigate } from '@solidjs/router';
import './medication_list.css';
import { Suspense } from 'solid-js';
import { EmptyScreen } from '@/shared/ui/empty_screen/empty_screen';

export function MedicationsListPage() {
  const medStore = useMedicationStore();
  const navigate = useNavigate();

  const medications = createAsync(medStore.allMedications);
  return (
    <main class="medications-list-page">
      <Suspense fallback={<div>Загружаем...</div>}>
        <List
          elementClass="medication-list-page__list"
          items={medications()?.map((m) => (
            <MedicationCard
              medication={m}
              onEditClick={() => {
                navigate(`/medications/edit/${m.id}`);
              }}
            />
          ))}
          fallback={<EmptyScreen />}
        />
        <A href="/medications/add">
          <BubblePlusIcon
            iconStyle={IconStyle.Active}
            elementClass="medication-list-page__add-medication-button"
          />
        </A>
      </Suspense>
    </main>
  );
}
