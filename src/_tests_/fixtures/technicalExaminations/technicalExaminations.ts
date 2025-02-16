import { TechnicalExaminationDTO } from 'features/technicalExaminations/api/dto'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const technicalExaminationListItem = (
  props?: Partial<Pick<TechnicalExaminationDTO, 'hasMechanicalDamage'>>,
): TechnicalExaminationDTO => ({
  hasMechanicalDamage: isUndefined(props?.hasMechanicalDamage) ? false : props!.hasMechanicalDamage,

  id: fakeId(),
  malfunction: fakeWord(),
  restorationAction: fakeWord(),
  restorationCost: fakeInteger(),
  conclusion: fakeWord(),
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'firstName', 'lastName', 'middleName'),
})
