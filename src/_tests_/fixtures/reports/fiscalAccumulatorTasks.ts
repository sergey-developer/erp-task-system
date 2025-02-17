import { FiscalAccumulatorTaskDTO } from 'features/reports/api/dto'
import pick from 'lodash/pick'

import {
  fakeAddress,
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeWord,
} from '_tests_/helpers'

import tasksFixtures from '../tasks'
import userFixtures from '../users'

export const fiscalAccumulatorTask = (
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
  assignee: pick(userFixtures.userDetail(), 'id', 'firstName', 'lastName', 'middleName'),
  comment: pick(tasksFixtures.taskComment(), 'id', 'text'),
})
