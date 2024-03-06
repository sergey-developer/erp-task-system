import { MeasurementUnitModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type CompletedWorkModel = {
  id: IdType
  title: string
  quantity: number
  measurementUnit: Pick<MeasurementUnitModel, 'id' | 'title'>
}
