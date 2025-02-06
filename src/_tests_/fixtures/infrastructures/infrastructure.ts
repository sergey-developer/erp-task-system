import { InfrastructureDTO } from 'features/infrastructures/api/dto'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import userFixtures from '_tests_/fixtures/user'
import { fakeId, fakeWord } from '_tests_/utils'

import { infrastructureStatusHistory } from './infrastructureStatusHistory'

export const infrastructure = (
  props?: Partial<Pick<InfrastructureDTO, 'id' | 'manager'>>,
): InfrastructureDTO => ({
  id: isUndefined(props?.id) ? fakeId() : props!.id,
  manager: isUndefined(props?.manager)
    ? {
        ...pick(
          userFixtures.user(),
          'id',
          'firstName',
          'lastName',
          'middleName',
          'avatar',
          'email',
          'phone',
        ),
        position: fakeWord(),
      }
    : props!.manager,

  status: infrastructureStatusHistory(),
})
