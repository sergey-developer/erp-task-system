import { MeasurementUnitsCatalogItemDTO } from 'shared/catalogs/measurementUnits/api/dto'
import { IdType } from 'shared/types/common'

export type TaskCompletedWorkDTO = {
  id: IdType
  title: string
  quantity: number
  measurementUnit: Pick<MeasurementUnitsCatalogItemDTO, 'id' | 'title'>
}
