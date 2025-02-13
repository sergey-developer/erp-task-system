import { IdType } from 'shared/types/common'

export type MeasurementUnitsCatalogItemDTO = {
  id: IdType
  title: string
}

export type MeasurementUnitsCatalogDTO = MeasurementUnitsCatalogItemDTO[]
