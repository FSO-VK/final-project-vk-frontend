import { MedicationForm } from '@/widgets/medication-form';
import { useNavigate } from '@solidjs/router';
import { type MedicationDraft, useMedicationActions } from '@/entities/medication';

export interface MedicationAddPageProps {
  backLocation: string;
  afterSaveLocation: string;
}

export function MedicationAddPage(props: MedicationAddPageProps) {
  const navigate = useNavigate();
  const medicationActions = useMedicationActions();
  const handleSave = async (m: MedicationDraft) => {
    await medicationActions.addMedication(m);
    navigate(props.afterSaveLocation, { replace: true });
  };
  return (
    <main class="medication-add-page">
      <MedicationForm
        onBackClick={() => {
          navigate(props.backLocation);
        }}
        onSaveClick={(m: MedicationDraft) => {
          handleSave(m).catch(() => {
            console.error('failed to add medication');
          });
        }}
      />
    </main>
  );
}
