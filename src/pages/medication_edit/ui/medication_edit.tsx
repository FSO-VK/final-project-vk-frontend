import { MedicationForm } from '@/widgets/medication-form';
import { createAsync, Navigate, useNavigate } from '@solidjs/router';
import {
  type MedicationDraft,
  useMedicationActions,
  useMedicationStore,
} from '@/entities/medication';
import { Match, Suspense, Switch } from 'solid-js';

export interface MedicationEditPageProps {
  medicationId: string;
  backLocation: string;
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

  return (
    <main class="medication-edit-page">
      <Suspense fallback="Загрузка...">
        <Switch>
          <Match when={medication() !== null}>
            <MedicationForm
              onBackClick={() => {
                navigate(props.backLocation);
              }}
              onSaveClick={(m: MedicationDraft) => {
                handleSave(m).catch(() => {
                  console.error('failed to edit medication');
                });
              }}
              initialMedication={medication() ?? undefined}
            />
          </Match>
          <Match when={medication() === null}>
            <Navigate href={props.backLocation} />
          </Match>
        </Switch>
      </Suspense>
    </main>
  );
}
