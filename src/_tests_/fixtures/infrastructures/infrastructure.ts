import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import { InfrastructureModel } from 'features/infrastructures/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeId, fakeWord } from '_tests_/utils'

import { infrastructureStatusHistory } from './infrastructureStatusHistory'

export const infrastructure = (
  props?: Partial<Pick<InfrastructureModel, 'id' | 'manager'>>,
): InfrastructureModel => ({
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
