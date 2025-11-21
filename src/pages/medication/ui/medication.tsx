import {
  getGaugeState,
  useMedicationActions,
  useMedicationStore,
  INITIAL_GAUGE_POSITION,
} from '@/entities/medication';
import { createAsync, useNavigate } from '@solidjs/router';
import {
  For,
  Suspense,
  createMemo,
  Show,
  type ParentProps,
  type JSX,
  splitProps,
  JSXElement,
  Switch,
  Match,
} from 'solid-js';
import './medication.css';
import {
  BookmarkIcon,
  CenteredLoaderSpinner,
  Gauge,
  EditIcon,
  IconStyle,
  TrashIcon,
  CrossIcon,
} from '@/shared/ui';
import { useLayoutStore } from '@/widgets/layouts';
import { SomethingBadScreen } from '@/features/something_bad';

const MS_IN_MONTH = 1000 * 60 * 60 * 24 * 30;
const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

function Labeled(
  props: ParentProps & JSX.LabelHTMLAttributes<HTMLLabelElement> & { label: JSXElement },
) {
  const [chosenProps, otherProps] = splitProps(props, ['children', 'class']);
  return (
    <div class={`labeled ${chosenProps.class}`}>
      <label {...otherProps} class="labeled__label">
        {props.label}
      </label>
      {chosenProps.children}
    </div>
  );
}

export interface MedicationPageProps {
  medicationId: string;
  medicationEditLocation: string;
  medicationsLocation: string;
}

export function MedicationPage(props: MedicationPageProps) {
  const medStore = useMedicationStore();
  const medication = createAsync(() => medStore.medicationById(props.medicationId));
  const medicationActions = useMedicationActions();
  const navigate = useNavigate();

  const layoutStore = useLayoutStore();

  const handleEdit = () => {
    if (medication() !== null && medication() !== undefined) {
      navigate(`${props.medicationEditLocation}/${medication()?.id}`);
    }
  };

  const handleDelete = async () => {
    if (medication() !== null && medication() !== undefined) {
      await medicationActions.removeMedication(medication()!.id);
      navigate(props.medicationsLocation, { replace: true });
    }
  };

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [
      {
        icon: EditIcon,
        text: 'Редактировать',
        onClick: () => handleEdit(),
        style: 'brand',
      },
      {
        icon: TrashIcon,
        text: 'Удалить',
        onClick: () => {
          handleDelete().catch((e) => {
            console.error('failed to delete medication:', e);
          });
        },
        style: 'danger',
      },
    ],
    title: 'Препарат',
  });

  const producerString = createMemo(() => {
    if (
      medication() === null ||
      medication()?.producer === undefined ||
      medication()?.producer?.name === ''
    ) {
      return 'Не указан';
    }

    return medication()?.producer?.country == ''
      ? medication()?.producer?.name
      : `${medication()?.producer?.name}, ${medication()?.producer?.country}`;
  });

  const expiresFormatter = new Intl.DateTimeFormat('ru-RU', {
    month: '2-digit',
    year: 'numeric',
  });

  const remainsFormatter = new Intl.DurationFormat('ru-RU', { style: 'long' });

  const remains = createMemo(() => {
    if (medication() === null || medication()?.expirationDate === undefined) {
      return 'Неизвестно';
    }
    const delta = medication()!.expirationDate.getTime() - Date.now();
    if (delta < 0) {
      return 'Срок истек';
    }
    const years = Math.floor(delta / MS_IN_YEAR);
    const months = Math.floor((delta - years * MS_IN_YEAR) / MS_IN_MONTH);
    return remainsFormatter.format({
      years: years > 0 ? years : undefined,
      months: (months > 0 && years > 0) || years === 0 ? months : undefined,
      style: 'digital',
    });
  });

  const gaugeState = createMemo(() => {
    return getGaugeState(medication());
  });

  return (
    <main class="medication-page">
      <Suspense fallback={<CenteredLoaderSpinner />}>
        <Show
          when={medication() !== undefined && medication() !== null}
          fallback=<SomethingBadScreen reason="Препарат не найден (HTTP 404)" />
        >
          <section class="medication-page__header-card">
            <Labeled for="medication-page__header" label="Название">
              <h1 id="medication-page__header" class="medication-page__name">
                {medication()?.name}
              </h1>
            </Labeled>
            <Labeled for="medication-page__group" label="Фармокологическая группа">
              <ul id="medication-page__group" class="medication-page__group-set">
                <For
                  each={medication()?.group}
                  fallback={<li class="medication-page__group">Не указана</li>}
                  children={(group) => (
                    <li class="medication-page__group overflow-guard">{group}</li>
                  )}
                />
              </ul>
            </Labeled>
            <Labeled for="medication-page__producer" label="Производитель">
              <span id="medication-page__producer" class="overflow-guard">
                {producerString()}
              </span>
            </Labeled>
          </section>
          <section class="medication-page__expiration-card">
            <Show when={gaugeState().show}>
              <div class="medication-page__gauge-container">
                <Gauge
                  initialDeg={INITIAL_GAUGE_POSITION}
                  fillPercentage={gaugeState().fillPercentage}
                  strokeColor={gaugeState().strokeColor}
                  class="medication-page__gauge"
                />
                <Switch>
                  <Match
                    when={gaugeState().fillPercentage > 0 && gaugeState().fillPercentage < 100}
                  >
                    <span class="medication-page__gauge-percent">
                      {`${Math.round(gaugeState().displayPercentage)} %`}
                    </span>
                  </Match>
                  <Match when={gaugeState().fillPercentage >= 100}>
                    <CrossIcon
                      iconStyle={IconStyle.Danger}
                      elementClass="medication-page__gauge-percent medication-page__gauge-expired"
                    />
                  </Match>
                </Switch>
              </div>
            </Show>
            <div class="medication-page__expiration-info">
              <Labeled for="medication-page__expires-at" label="Годен до">
                <span class="overflow-guard">
                  {expiresFormatter.format(medication()?.expirationDate)}
                </span>
              </Labeled>
              <Labeled for="medication-page__remains" label="Осталось">
                <span class="overflow-guard">{remains()}</span>
              </Labeled>
            </div>
          </section>
          <section class="medication-page__form-card">
            <Labeled for="medication-page__release-form" label="Форма выпуска">
              <span class="overflow-guard">{medication()?.releaseForm}</span>
            </Labeled>
            <Labeled for="medication-page__amount" label="Количество">
              <span class="overflow-guard">{`${medication()?.amount.value} ${medication()?.amount.unit}`}</span>
            </Labeled>
            <Labeled
              for="medication-page__active-substance-set"
              label="Действующее вещество"
              class="medication-page__active-substance-labeled"
            >
              <div
                class="medication-page__active-substance-set"
                id="medication-page__active-substance-set"
              >
                <For
                  each={medication()?.activeSubstance}
                  fallback="Не указано"
                  children={(substance) => (
                    <div class="medication-page__active-substance">
                      <span class="overflow-guard">{substance.name}</span>
                      <span class="overflow-guard">{`${substance.value} ${substance.unit}`}</span>
                    </div>
                  )}
                />
              </div>
            </Labeled>
          </section>
          <Show when={medication()?.comment}>
            <section class="medication-page__comment-card">
              <Labeled
                for="medication-page__comment"
                label={
                  <div class="medication-page__comment-label">
                    <BookmarkIcon
                      iconStyle={IconStyle.Secondary}
                      elementClass="medication-page__comment-label-icon"
                    />
                    <span>Комментарий пользователя</span>
                  </div>
                }
              >
                <span>{medication()?.comment}</span>
              </Labeled>
            </section>
          </Show>
        </Show>
      </Suspense>
    </main>
  );
}
