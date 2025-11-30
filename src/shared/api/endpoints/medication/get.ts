import { backendClient } from '../../client';
import * as z from 'zod/mini';
import { BaseDTO } from './dto';

export interface GetMedicationOptions {
  id: string;
}

export const GetMedicationDTO = BaseDTO;

export async function get(
  options: GetMedicationOptions,
): Promise<z.infer<typeof GetMedicationDTO>> {
  const body = await backendClient.get(`/medication/medication/${options.id}`, {
    useCredentials: true,
  });
  return GetMedicationDTO.parse(body);
}

export async function getMock(
  options: GetMedicationOptions,
): Promise<z.infer<typeof GetMedicationDTO>> {
  return await Promise.resolve({
    id: options.id,
    name: 'Мирасепт',
    internationalName: 'Декасан',
    amount: {
      value: 50,
      unit: 'мл.',
    },
    releaseForm: 'Спрей',
    group: [
      'Антисептическое средство',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque quas tempora voluptatem iste laudantium eum cumque excepturi! Eligendi beatae provident, architecto culpa voluptate laudantium ea id rerum esse. Placeat, nemo. Facere temporibus veniam tenetur maiores sint, inventore harum dolorum est nemo ipsa ipsum aliquam sequi in porro distinctio cum autem voluptatum quaerat quos voluptatem delectus labore quibusdam quisquam doloribus. Tenetur earum optio quos, laboriosam modi commodi dolorem suscipit neque? Quibusdam blanditiis quod sed labore iure praesentium quidem, esse assumenda enim perferendis cupiditate vitae modi explicabo eaque nulla voluptates, iusto magnam reiciendis dolorum odio neque quo temporibus cumque. Officia quidem praesentium eveniet nihil delectus quis veniam saepe porro animi non, mollitia provident asperiores nemo obcaecati ut, perspiciatis neque vel optio! Voluptas rerum temporibus assumenda nostrum hic dolor, deserunt laboriosam ipsum mollitia, necessitatibus iusto fugiat odio quidem quae quisquam tempora vitae omnis accusamus magnam libero. Est corporis tempore earum maxime eveniet perspiciatis quae facilis recusandae, fugiat culpa harum fuga, molestiae ea voluptates. Corrupti officia assumenda esse perferendis quo repudiandae sint aspernatur voluptatibus numquam aliquam, et provident tenetur dolorem libero ad quis sunt impedit soluta! Eveniet, ipsa? Nostrum eaque officia, quos molestiae quasi dignissimos? Itaque rerum quam odit dignissimos quis eveniet voluptate inventore?',
    ],
    producer: {
      name: 'С.К. ТЕРАПИЯ С.А.',
      country: 'Румыния',
    },
    activeSubstance: [
      {
        name: 'Бромдигидрохлорфенилбензодиазепин',
        value: 10,
        unit: 'мл.',
      },
      {
        name: 'Амбазона моногидрат',
        value: 10,
        unit: 'мг',
      },
      {
        name: 'Декаметилендиметилметоксикарбонилметиламмония дихлорид',
        value: 10,
        unit: 'мг',
      },
    ],
    barCode: '5944702206931',
    expirationDate: new Date('2027-12-31'),
    releaseDate: new Date('2024-10-31'),
    comment:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque quas tempora voluptatem iste laudantium eum cumque excepturi! Eligendi beatae provident, architecto culpa voluptate laudantium ea id rerum esse. Placeat, nemo. Facere temporibus veniam tenetur maiores sint, inventore harum dolorum est nemo ipsa ipsum aliquam sequi in porro distinctio cum autem voluptatum quaerat quos voluptatem delectus labore quibusdam quisquam doloribus. Tenetur earum optio quos, laboriosam modi commodi dolorem suscipit neque? Quibusdam blanditiis quod sed labore iure praesentium quidem, esse assumenda enim perferendis cupiditate vitae modi explicabo eaque nulla voluptates, iusto magnam reiciendis dolorum odio neque quo temporibus cumque. Officia quidem praesentium eveniet nihil delectus quis veniam saepe porro animi non, mollitia provident asperiores nemo obcaecati ut, perspiciatis neque vel optio! Voluptas rerum temporibus assumenda nostrum hic dolor, deserunt laboriosam ipsum mollitia, necessitatibus iusto fugiat odio quidem quae quisquam tempora vitae omnis accusamus magnam libero. Est corporis tempore earum maxime eveniet perspiciatis quae facilis recusandae, fugiat culpa harum fuga, molestiae ea voluptates. Corrupti officia assumenda esse perferendis quo repudiandae sint aspernatur voluptatibus numquam aliquam, et provident tenetur dolorem libero ad quis sunt impedit soluta! Eveniet, ipsa? Nostrum eaque officia, quos molestiae quasi dignissimos? Itaque rerum quam odit dignissimos quis eveniet voluptate inventore?',
  });
}
