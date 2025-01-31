import { IdType } from 'shared/types/common'

export type SubTaskTemplateListItemModel = {
  id: IdType
  code: string
  title: string
}

export type SubTaskTemplatesCatalogModel = SubTaskTemplateListItemModel[]
