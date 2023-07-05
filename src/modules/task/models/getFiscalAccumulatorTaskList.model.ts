import { SortKey } from 'modules/task/features/FiscalAccumulatorTaskTable/constants/sort'

import { FiscalAccumulatorTaskListModel } from './fiscalAccumulatorTaskList.model'

export type GetFiscalAccumulatorTaskListQueryArgs = {
  sort?: SortKey
}

export type GetFiscalAccumulatorTaskListSuccessResponse =
  FiscalAccumulatorTaskListModel
