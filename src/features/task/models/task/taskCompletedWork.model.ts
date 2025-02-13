import { MeasurementUnitsCatalogItemDTO } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'

export type TaskCompletedWorkModel = {
  id: IdType
  title: string
  quantity: number
  measurementUnit: Pick<MeasurementUnitsCatalogItemDTO, 'id' | 'title'>
}
