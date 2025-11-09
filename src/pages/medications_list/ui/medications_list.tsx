import { useMedicationStore } from '@/entities/medication';
import { MedicationCard } from '@/entities/medication';
import { BubblePlusIcon, IconStyle, List } from '@/shared/ui';
import { A, createAsync, useNavigate } from '@solidjs/router';
import './medication_list.css';
import { Suspense } from 'solid-js';
import { EmptyScreen } from '@/shared/ui/empty_screen/empty_screen';
import { useLayoutStore } from '@/widgets/layouts';

export function MedicationsListPage() {
  const medStore = useMedicationStore();
  const navigate = useNavigate();

  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Список препаратов',
  });

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
      </Suspense>
      <A href="/medications/add" class="medication-list-page__add-medication-button">
        <BubblePlusIcon
          iconStyle={IconStyle.Active}
          elementClass="medication-list-page__add-medication-button-icon"
        />
      </A>
    </main>
  );
}
