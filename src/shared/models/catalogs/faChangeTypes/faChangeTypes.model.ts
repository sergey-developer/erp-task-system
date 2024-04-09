import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type FaChangeTypeListItemModel = {
  id: IdType
  title: string
  isDefault: MaybeNull<boolean>
}

export type FaChangeTypesModel = FaChangeTypeListItemModel[]
