import { IdType } from 'shared/types/common'

export type LegalEntityListItemModel = {
  id: IdType
  title: string
}

export type LegalEntityListModel = Array<LegalEntityListItemModel>
