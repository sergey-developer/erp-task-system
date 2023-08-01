import times from 'lodash/times'

import { SubTaskTemplateModel } from 'modules/subTask/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const fakeSubTaskTemplate = (): SubTaskTemplateModel => ({
  id: fakeId(),
  title: fakeWord(),
  code: fakeWord(),
})

export const fakeSubTaskTemplateList = (
  length: number = 1,
): Array<SubTaskTemplateModel> => times(length, () => fakeSubTaskTemplate())
