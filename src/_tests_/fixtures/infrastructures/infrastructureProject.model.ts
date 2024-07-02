import pick from 'lodash/pick'

import { InfrastructureProjectModel } from 'modules/infrastructures/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeId } from '_tests_/utils'

export const infrastructureProject = (): InfrastructureProjectModel => ({
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
})
