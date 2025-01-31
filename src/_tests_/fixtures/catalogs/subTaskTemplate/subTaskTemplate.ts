import { SubTaskTemplateModel } from 'shared/catalogs/api/dto/subTaskTemplates'

import { fakeId, fakeWord } from '_tests_/utils'

export const subTaskTemplate = (): SubTaskTemplateModel => ({
  id: fakeId(),
  title: fakeWord(),
  code: fakeWord(),
})
