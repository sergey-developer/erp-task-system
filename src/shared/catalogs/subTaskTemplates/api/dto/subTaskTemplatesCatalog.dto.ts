import { IdType } from 'shared/types/common'

export type SubTaskTemplateCatalogItemDTO = {
  id: IdType
  code: string
  title: string
}

export type SubTaskTemplatesCatalogDTO = SubTaskTemplateCatalogItemDTO[]
