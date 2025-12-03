import { useMedicationStore } from '@/entities/medication';
import { CenteredLoaderSpinner } from '@/shared/ui';
import { useLayoutStore } from '@/widgets/layouts';
import { createAsync } from '@solidjs/router';
import { Suspense, Show, createMemo, For } from 'solid-js';
import { SomethingBadScreen } from '@/features/something_bad';
import { INSTRUCTION_I11N } from '@/entities/medication/model/medication';

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
          <For each={instructionRender()}>
            {({ header, content }) => (
              <div>
                <div>{header}</div>
                <div>{content}</div>
              </div>
            )}
          </For>
        </Show>
      </Suspense>
    </main>
  );
}
