import { FiscalAccumulatorListItemModel } from 'modules/fiscalAccumulator/models'

import {
  fakeAddress,
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeWord,
} from '_tests_/utils'

export const fiscalAccumulatorListItem = (
  props?: Partial<Pick<FiscalAccumulatorListItemModel, 'faFormat'>>,
): FiscalAccumulatorListItemModel => ({
  address: fakeAddress(),
  name: fakeWord(),
  title: fakeWord(),
  recordId: fakeIdStr(),
  blockingIn: fakeInteger(),
  createdAt: fakeDateString(),
  olaNextBreachTime: fakeDateString(),
  sapId: fakeIdStr(),
  deadlineOrTotalFiscalDocs: fakeInteger(),
  fiscalAccumulator: { id: fakeId(), faNumber: fakeInteger() },
  supportGroup: {
    id: fakeId(),
    name: fakeWord(),
    macroregion: { id: fakeId(), title: fakeWord() },
  },
  faFormat: props?.faFormat || null,
})
