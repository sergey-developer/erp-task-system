import { MaybeNull } from 'shared/types/utils'

export type EquipmentCategoryModel = {
  id: number
  title: string
  code: MaybeNull<string>
}
