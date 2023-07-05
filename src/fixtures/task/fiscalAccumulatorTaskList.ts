import { FiscalAccumulatorTaskListItemModel } from 'modules/task/models'

import {
  fakeAddress,
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeWord,
} from '_tests_/utils'

export const fakeFiscalAccumulatorTaskListItem = (
  props?: Partial<Pick<FiscalAccumulatorTaskListItemModel, 'faFormat'>>,
): FiscalAccumulatorTaskListItemModel => ({
  id: fakeId(),
  address: fakeAddress(),
  name: fakeWord(),
  title: fakeWord(),
  recordId: fakeIdStr(),
  blockingIn: fakeInteger(),
  createdAt: fakeDateString(),
  olaNextBreachTime: fakeDateString(),
  sapId: fakeIdStr(),
  deadlineOrTotalFiscalDocs: fakeInteger(),
  fiscalAccumulator: { faNumber: fakeInteger() },
  supportGroup: {
    id: fakeId(),
    name: fakeWord(),
    macroregion: { id: fakeId(), title: fakeWord() },
  },
  faFormat: props?.faFormat || null,
})
