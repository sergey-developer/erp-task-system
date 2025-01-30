import { SubTaskTemplateModel } from 'shared/catalogs/models/subTaskTemplates'

import { fakeId, fakeWord } from '_tests_/utils'

export const subTaskTemplate = (): SubTaskTemplateModel => ({
  id: fakeId(),
  title: fakeWord(),
  code: fakeWord(),
})
