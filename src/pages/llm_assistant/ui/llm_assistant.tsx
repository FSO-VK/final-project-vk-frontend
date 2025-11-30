import { useMedicationStore } from '@/entities/medication';
import { SomethingBadScreen } from '@/features/something_bad';
import { useLayoutStore } from '@/widgets/layouts';
import { createAsync } from '@solidjs/router';
import { Suspense, Show } from 'solid-js';

export interface LlmAssistantPageProps {
  medicationId: string;
}

export function LlmAssistantPage(props: LlmAssistantPageProps) {
  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: '',
  });

  const medStore = useMedicationStore();
  const medication = createAsync(() => medStore.medicationById(props.medicationId));

  return (
    <main class="llm-assistant-page">
      <Suspense>
        <Show
          when={medication() !== undefined && medication() !== null}
          fallback=<SomethingBadScreen reason="Препарат не найден (HTTP 404)" />
        >
          Страница LLM-помощника {medication()?.id}
        </Show>
      </Suspense>
    </main>
  );
}
