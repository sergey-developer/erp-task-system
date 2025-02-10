import { FiscalAccumulatorTaskDTO } from 'features/reports/api/dto'
import pick from 'lodash/pick'

import {
  fakeAddress,
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeWord,
} from '_tests_/utils'

import taskFixtures from '../task'
import userFixtures from '../user'

export const fiscalAccumulatorTaskListItem = (
  props?: Partial<Pick<FiscalAccumulatorTaskDTO, 'faFormat'>>,
): FiscalAccumulatorTaskDTO => ({
  faFormat: props?.faFormat || null,

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
  fiscalAccumulator: { id: fakeId(), faNumber: fakeInteger() },
  supportGroup: {
    id: fakeId(),
    name: fakeWord(),
    macroregion: { id: fakeId(), title: fakeWord() },
  },
  assignee: pick(userFixtures.user(), 'id', 'firstName', 'lastName', 'middleName'),
  comment: pick(taskFixtures.comment(), 'id', 'text'),
})
