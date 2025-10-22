import { List, Col } from '@/shared/ui';
import { medicationApi, type Medication } from '@/shared/api';
import { MedicationCard } from '../medication_card/medication_card';
import './medications.css';
import { createAsync } from '@solidjs/router';
import { Suspense } from 'solid-js';

async function fetchCards() {
  const medicines = await medicationApi.getMedicationsList();
  const cards = medicines.map((medicine: Medication) => (
    <Col size={12}>
      {' '}
      <MedicationCard medicine={medicine} />{' '}
    </Col>
  ));
  return cards;
}

export function MedicationsPage() {
  const cards = createAsync(fetchCards);
  return (
    <div class="medicines-page__list">
      <h1>Список препаратов</h1>
      <Suspense fallback="Загрузка...">
        <List items={cards()} />
      </Suspense>
    </div>
  );
}
