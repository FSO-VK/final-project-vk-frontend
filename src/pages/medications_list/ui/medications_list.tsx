import { useMedicationStore } from '@/entities/medication';
import { MedicationCard } from '@/entities/medication';
import { BubblePlusIcon, CrossIcon, IconStyle, List, Popup, ScanIcon } from '@/shared/ui';
import { A, createAsync, useNavigate } from '@solidjs/router';
import './medication_list.css';
import { createSignal, Show, Suspense } from 'solid-js';
import { EmptyScreen } from '@/shared/ui/empty_screen/empty_screen';
import { useLayoutStore } from '@/widgets/layouts';
import { Scanner } from '@/features/medication_scan';
import { Portal } from 'solid-js/web';

export interface MedicationsListProps {
  onScanned: (result: string) => void;
}

export function MedicationsListPage(props: MedicationsListProps) {
  const medStore = useMedicationStore();
  const navigate = useNavigate();

  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: false,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Список препаратов',
  });

  const [showScanner, setShowScanner] = createSignal(false);

  const handleScanClick = () => {
    setShowScanner(!showScanner());
  };

  const handleScanResult = (result: string) => {
    setShowScanner(false);
    props.onScanned(result);
  };

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
              medicationPageLocation={`/medications/view/${m.id}`}
            />
          ))}
          fallback={<EmptyScreen />}
        />
      </Suspense>
      <div class="medication-list-page__add-medication-options">
        <button
          type="button"
          class="medication-list-page__scan-medication-button"
          onClick={() => handleScanClick()}
        >
          <ScanIcon
            iconStyle={IconStyle.Active}
            elementClass="medication-list-page__add-medication-button-icon"
          />
        </button>
        <A href="/medications/add" class="medication-list-page__add-medication-button">
          <BubblePlusIcon
            iconStyle={IconStyle.Active}
            elementClass="medication-list-page__add-medication-button-icon"
          />
        </A>
      </div>
      <Show when={showScanner()}>
        <Popup>
          <Scanner
            class="medication-list-page__scanner"
            videoConstraints={{
              facingMode: { ideal: 'environment' },
              width: { ideal: 4096 },
              height: { ideal: 2160 },
            }}
            onScanResult={(result) => handleScanResult(result)}
          />
          <div class="medication-list-page__video-shadow">
            <div class="medication-list-page__video-light" />
          </div>
        </Popup>
        <Portal>
          <div class="medication-list-page__scan-hint">
            <span>Найдите код для сканирования</span>
          </div>
          <button
            type="button"
            class="medication-list-page__close-scanner-button"
            onClick={() => setShowScanner(false)}
          >
            <CrossIcon
              iconStyle={IconStyle.ActiveWhite}
              elementClass="medication-list-page__close-scanner-icon"
            />
          </button>
        </Portal>
      </Show>
    </main>
  );
}
