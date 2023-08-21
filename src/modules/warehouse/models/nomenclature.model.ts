import { MaybeNull } from 'shared/types/utils'

export type NomenclatureModel = {
  id: number
  title: string
  shortTitle: string
  vendorCode: string
  group: {
    id: number
    title: string
  }
  measurementUnit: {
    id: number
    title: string
  }
  country: MaybeNull<{
    id: number
    title: string
  }>
}
