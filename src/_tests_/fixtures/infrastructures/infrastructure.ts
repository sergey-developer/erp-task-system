import pick from 'lodash/pick'

import { InfrastructureModel } from 'modules/infrastructures/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeId } from '_tests_/utils'

import { infrastructureStatusHistory } from './infrastructureStatusHistory'

export const infrastructure = (): InfrastructureModel => ({
  id: fakeId(),
  manager: pick(
    userFixtures.user(),
    'id',
    'firstName',
    'lastName',
    'middleName',
    'avatar',
    'email',
    'phone',
    'position',
  ),
  status: infrastructureStatusHistory(),
})
