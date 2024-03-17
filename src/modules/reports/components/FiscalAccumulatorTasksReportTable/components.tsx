import { GetComponentProps, TableComponents } from 'rc-table/es/interface'
import { FC } from 'react'

import { BodyCellStyled } from './styles'
import { FiscalAccumulatorTasksReportTableItem } from './types'

export type BodyCellProps = ReturnType<GetComponentProps<FiscalAccumulatorTasksReportTableItem>> & {
  bgColor?: string
}

const BodyCell: FC<BodyCellProps> = ({ bgColor, ...props }) => (
  <BodyCellStyled $bgColor={bgColor} {...props} />
)

export const components: TableComponents<FiscalAccumulatorTasksReportTableItem> = {
  body: {
    cell: BodyCell,
  },
}
