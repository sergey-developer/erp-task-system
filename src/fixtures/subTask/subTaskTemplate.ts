import { SubTaskTemplateModel } from 'modules/subTask/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const subTaskTemplate = (): SubTaskTemplateModel => ({
  id: fakeId(),
  title: fakeWord(),
  code: fakeWord(),
})
