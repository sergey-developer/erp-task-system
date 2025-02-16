import times from 'lodash/times'

import { SupportGroupDTO, SupportGroupsDTO } from 'shared/supportGroups/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const supportGroup = (): SupportGroupDTO => ({
  id: fakeId(),
  name: fakeWord(),
})

export const supportGroups = (length: number = 1): SupportGroupsDTO =>
  times(length, () => supportGroup())
