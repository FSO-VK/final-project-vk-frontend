import { MedicationForm } from '@/widgets/medication-form';
import { createAsync, useNavigate } from '@solidjs/router';
import {
  type MedicationDraft,
  useMedicationActions,
  useMedicationStore,
} from '@/entities/medication';
import { useLayoutStore } from '@/widgets/layouts';
import { Suspense } from 'solid-js';

export interface MedicationAddPageProps {
  onBackClick: () => void;
  afterSaveLocation: string;
  initialDataMatrix?: string;
}

export function MedicationAddPage(props: MedicationAddPageProps) {
  const navigate = useNavigate();
  const medicationActions = useMedicationActions();
  const handleSave = async (m: MedicationDraft) => {
    await medicationActions.addMedication(m);
    navigate(props.afterSaveLocation, { replace: true });
  };
  const medicationStore = useMedicationStore();

  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Добавление препарата',
  });

  const medication = createAsync(async () => {
    if (props.initialDataMatrix !== undefined) {
      const med = await medicationStore.medicationByScan(props.initialDataMatrix);
      return med;
    }
  });

  return (
    <main class="medication-add-page">
      <Suspense fallback={<div>Загрузка...</div>}>
        <MedicationForm
          header="Добавление препарата"
          onBackClick={() => {
            props.onBackClick();
          }}
          onSaveClick={(m: MedicationDraft) => {
            handleSave(m).catch(() => {
              console.error('failed to add medication');
            });
          }}
          initialMedication={medication() ?? undefined}
        />
      </Suspense>
    </main>
  );
}
