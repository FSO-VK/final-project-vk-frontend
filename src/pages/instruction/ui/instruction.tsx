import { useMedicationStore } from '@/entities/medication';
import { CenteredLoaderSpinner } from '@/shared/ui';
import { useLayoutStore } from '@/widgets/layouts';
import { createAsync } from '@solidjs/router';
import { Suspense, Show, createMemo, For, createSignal } from 'solid-js';
import { SomethingBadScreen } from '@/features/something_bad';
import { INSTRUCTION_I11N } from '@/entities/medication/model/medication';
import { Folder } from './folder';
import './instruction.css';

export interface InstructionPageProps {
  medicationId: string;
}

export function InstructionPage(props: InstructionPageProps) {
  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: '',
  });

  const medStore = useMedicationStore();
  const instruction = createAsync(() => medStore.instructionByMedicationId(props.medicationId));

  const INSTRUCTION_SHOW_ORDER = [
    'pharmInfluence',
    'pharmKinetics',
    'usingIndication',
    'dosage',
    'overDosage',
    'sideEffects',
    'usingCounterIndication',
    'lactation',
    'hepaticInfluence',
    'renalInfluence',
    'childUsage',
    'elderlyUsage',
    'specialInstruction',
    'interaction',
  ];

  const instructionRender = createMemo(() => {
    const instr = instruction() as Record<string, string> | null | undefined;
    if (instr === null || instr === undefined) {
      return [];
    }
    return INSTRUCTION_SHOW_ORDER.filter((key) => instr[key] !== '').map((key) => {
      return {
        header: INSTRUCTION_I11N[key],
        content: instr[key],
      };
    });
  });

  return (
    <main class="instruction-page">
      <Suspense fallback={<CenteredLoaderSpinner />}>
        <Show
          when={instruction()}
          fallback=<SomethingBadScreen reason="Препарат не найден (HTTP 404)" />
        >
          <div class="instruction-page__sections-container">
            <For each={instructionRender()}>
              {({ header, content }) => {
                const [opened, setOpened] = createSignal(false);
                return (
                  <section class="instruction-page__section">
                    <Folder
                      caption={header}
                      opened={opened()}
                      onOpenClick={() => {
                        setOpened(!opened());
                      }}
                    >
                      {content}
                    </Folder>
                  </section>
                );
              }}
            </For>
          </div>
        </Show>
      </Suspense>
    </main>
  );
}
