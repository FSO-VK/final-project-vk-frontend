import type { MedicineCategory } from './medicine_category';

export interface Medicine {
  id: string;
  name: string;
  categories: MedicineCategory[];
  items: number;
  itemsUnit: string;
  expires: Date;
}
