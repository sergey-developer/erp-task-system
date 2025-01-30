import { IdType } from 'shared/types/common'

// todo: переименовать другие каталоги также
export type WorkGroupsCatalogListItemModel = {
  id: IdType
  name: string
}

export type WorkGroupsCatalogModel = WorkGroupsCatalogListItemModel[]
