import { MeasurementUnitModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type TaskCompletedWorkModel = {
  id: IdType
  title: string
  quantity: number
  measurementUnit: Pick<MeasurementUnitModel, 'id' | 'title'>
}
