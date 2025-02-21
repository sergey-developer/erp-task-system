import { SubTaskTemplateCatalogItemDTO } from 'shared/catalogs/subTaskTemplates/api/dto/subTaskTemplatesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const subTaskTemplateCatalogItem = (): SubTaskTemplateCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
  code: fakeWord(),
})
