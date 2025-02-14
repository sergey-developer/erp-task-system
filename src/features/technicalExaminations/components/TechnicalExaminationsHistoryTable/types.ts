import { TableProps } from 'antd'
import { TechnicalExaminationDTO } from 'features/technicalExaminations/api/dto'

import { SetNonNullable } from 'shared/types/utils'

export type TechnicalExaminationsHistoryTableItem = Pick<
  TechnicalExaminationDTO,
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
