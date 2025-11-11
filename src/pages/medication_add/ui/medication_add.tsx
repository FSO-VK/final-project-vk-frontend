import { MedicationForm } from '@/widgets/medication-form';
import { useNavigate } from '@solidjs/router';
import { type MedicationDraft, useMedicationActions } from '@/entities/medication';
import { useLayoutStore } from '@/widgets/layouts';

export interface MedicationAddPageProps {
  onBackClick: () => void;
  afterSaveLocation: string;
}

export function MedicationAddPage(props: MedicationAddPageProps) {
  const navigate = useNavigate();
  const medicationActions = useMedicationActions();
  const handleSave = async (m: MedicationDraft) => {
    await medicationActions.addMedication(m);
    navigate(props.afterSaveLocation, { replace: true });
  };

  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Добавление препарата',
  });

  return (
    <main class="medication-add-page">
      <MedicationForm
        onBackClick={() => {
          props.onBackClick();
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
