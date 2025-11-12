import { MedicationForm } from '@/widgets/medication-form';
import { createAsync, useNavigate } from '@solidjs/router';
import {
  type MedicationDraft,
  useMedicationActions,
  useMedicationStore,
} from '@/entities/medication';
import { Show, Suspense } from 'solid-js';
import { useLayoutStore } from '@/widgets/layouts';
import { SomethingBadScreen } from '@/features/something_bad';

export interface MedicationEditPageProps {
  medicationId: string;
  onBackClick: () => void;
  afterSaveLocation: string;
}

export function MedicationEditPage(props: MedicationEditPageProps) {
  const navigate = useNavigate();
  const medicationActions = useMedicationActions();
  const handleSave = async (m: MedicationDraft) => {
    await medicationActions.updateMedication({ ...m, id: props.medicationId });
    navigate(props.afterSaveLocation, { replace: true });
  };

  const store = useMedicationStore();
  const medication = createAsync(() => store.medicationById(props.medicationId));

  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Редактирование препарата',
  });

  return (
    <main class="medication-edit-page">
      <Suspense fallback="Загрузка...">
        <Show
          when={medication() !== null}
          fallback={<SomethingBadScreen reason="Препарат не найден (HTTP 404)" />}
        >
          <MedicationForm
            header="Редактирование препарата"
            onBackClick={() => {
              props.onBackClick();
            }}
            onSaveClick={(m: MedicationDraft) => {
              handleSave(m).catch(() => {
                console.error('failed to edit medication');
              });
            }}
            initialMedication={medication() ?? undefined}
          />
        </Show>
      </Suspense>
    </main>
  );
}
