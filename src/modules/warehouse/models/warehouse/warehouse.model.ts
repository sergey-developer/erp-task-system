import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type WarehouseModel = {
  id: IdType
  title: string
  legalEntity: {
    id: IdType
    title: string
  }
  address: string
  parent: MaybeNull<{
    id: IdType
    title: string
  }>
  contract: MaybeNull<string>
  notes: MaybeNull<string>
}
