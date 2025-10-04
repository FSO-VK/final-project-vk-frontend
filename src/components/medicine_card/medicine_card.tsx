import type { Medicine } from '../../shared/api/src/dto/medicine';
import Divider from '../layouts/divider/divider.tsx';
import './medicine_card.css';

export interface MedicineCardProps {
  medicine: Medicine;
}

function MedicineCard(props: MedicineCardProps) {
  return (
    <section class="medicine-card medicine-card_main">
      <h3 class="medicine-card__name">{props.medicine.name}</h3>
      <Divider />
      <div class="medicine-card__info">
        <span class="medicine-card__amount">
          {props.medicine.items} {props.medicine.itemsUnit}
        </span>
        <span class="medicine-card__expires">
          Годен до {props.medicine.expires.toLocaleDateString()}
        </span>
      </div>
    </section>
  );
}

export default MedicineCard;
