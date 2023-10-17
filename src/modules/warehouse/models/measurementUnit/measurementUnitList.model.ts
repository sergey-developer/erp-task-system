import { IdType } from 'shared/types/common'

export type MeasurementUnitListItemModel = {
  id: IdType
  title: string
}

export type MeasurementUnitListModel = MeasurementUnitListItemModel[]
