import { InfrastructureDTO } from 'features/infrastructures/api/dto'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import userFixtures from '_tests_/fixtures/api/data/users'
import { fakeId, fakeWord } from '_tests_/helpers'

import { infrastructureStatusHistoryItem } from './infrastructureStatusHistory'

export const infrastructure = (
  props?: Partial<Pick<InfrastructureDTO, 'id' | 'manager'>>,
): InfrastructureDTO => ({
  id: isUndefined(props?.id) ? fakeId() : props!.id,
  manager: isUndefined(props?.manager)
    ? {
        ...pick(
          userFixtures.userDetail(),
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

  status: infrastructureStatusHistoryItem(),
})
