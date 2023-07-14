import { MaybeNull } from 'shared/interfaces/utils'

export type WarehouseModel = {
  id: number
  title: string
  parent: MaybeNull<{
    id: number
    title: string
  }>
  legalEntity: {
    id: number
    title: string
  }
  address: string
  contract: MaybeNull<string>
  notes: MaybeNull<string>
}
