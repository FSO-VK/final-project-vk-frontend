import List from '../../layouts/list/list';
import TopBottomLayout from '../../layouts/top_bottom_layout/top_bottom_layout';
import type { Medicine } from '../../../shared/api/src/dto/medicine';
import MedicineCard from '../../medicine_card/medicine_card';
import Col from '../../layouts/col/col';
import './medicines_page.css';
import { createAsync } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { Api } from '@/index';

async function fetchCards() {
  const medicines = await Api.medicine.getMedicinesList();
  const cards = medicines.map((medicine: Medicine) => (
    <Col size={12}>
      {' '}
      <MedicineCard medicine={medicine} />{' '}
    </Col>
  ));
  return cards;
}

function MedicinesPage() {
  const cards = createAsync(fetchCards);
  return (
    <TopBottomLayout>
      <div class="medicines-page__list">
        <h1>Список препаратов</h1>
        <Suspense fallback="Загрузка...">
          <List items={cards()} />
        </Suspense>
      </div>
    </TopBottomLayout>
  );
}

export default MedicinesPage;
