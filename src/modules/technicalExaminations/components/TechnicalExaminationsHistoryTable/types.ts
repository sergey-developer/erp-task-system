import { TableProps } from 'antd'

import { TechnicalExaminationListItemModel } from 'modules/technicalExaminations/models'

import { SetNonNullable } from 'shared/types/utils'

export type TechnicalExaminationsHistoryTableItem = Pick<
  TechnicalExaminationListItemModel,
  | 'id'
  | 'createdBy'
  | 'createdAt'
  | 'malfunction'
  | 'hasMechanicalDamage'
  | 'restorationAction'
  | 'restorationCost'
  | 'conclusion'
>

export type TechnicalExaminationsHistoryTableProps = SetNonNullable<
  Pick<TableProps<TechnicalExaminationsHistoryTableItem>, 'dataSource' | 'loading'>
>
