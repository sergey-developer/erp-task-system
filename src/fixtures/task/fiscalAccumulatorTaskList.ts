import { FiscalAccumulatorTaskListItemModel } from 'modules/task/models'

import {
  fakeAddress,
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeWord,
} from '_tests_/utils'

export const fakeFiscalAccumulatorTaskListItem =
  (): FiscalAccumulatorTaskListItemModel => ({
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
    supportGroup: { name: fakeWord(), macroregion: { title: fakeWord() } },
  })
