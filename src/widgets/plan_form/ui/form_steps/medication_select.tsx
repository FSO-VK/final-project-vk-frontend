import { withForm } from '@/shared/lib';
import { P, RadioGroup, SearchFilter } from '@/shared/ui';
import { type ShortMedication } from '@/entities/medication';
import { createMemo, createSignal } from 'solid-js';
import './medication_select.css';

export const MedicationSelectForm = withForm({
  defaultValues: {
    medicationId: '',
  },
  props: {
    medications: [] as ShortMedication[],
  },
  render: function Render(props) {
    const medOptions = createMemo(() =>
      props.medications.map((med) => {
        return {
          value: med.id,
          label: med.name,
        };
      }),
    );

    const [filtered, setFiltered] = createSignal([] as { value: string; label: string }[]);
    const [selectedIdx, setSelectedIdx] = createSignal(undefined as number | undefined);

    const handleFiltered = (filtered: { value: string; label: string }[]) => {
      setFiltered(filtered);
      setSelectedIdx(undefined);
    };

    return (
      <div class="medication-select-form">
        <h2 class="medication-select-form__header">
          Прием какого препарата вы хотите запланировать?
        </h2>
        <P>Найдите лекарство в поиске или сразу выберите из списка</P>
        <SearchFilter
          searchValues={medOptions()}
          onFiltered={(filtered) => handleFiltered(filtered)}
        />
        <form class="medication-select-form__options">
          <props.form.Field
            name="medicationId"
            children={(field) => {
              return (
                <RadioGroup
                  class="medication-select-form__radiogroup"
                  name={field().name}
                  options={filtered()}
                  selectedIdx={selectedIdx()}
                  onOptionSelected={(opt, idx) => {
                    setSelectedIdx(idx);
                    field().handleChange(opt.value);
                    props.form.handleSubmit().catch((e) => {
                      console.error('failed to submit medication select form: ', e);
                    });
                  }}
                />
              );
            }}
          />
        </form>
      </div>
    );
  },
});
