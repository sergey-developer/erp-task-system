import { GetComponentProps, TableComponents } from 'rc-table/es/interface'
import { FC } from 'react'

import { BodyCellStyled } from './styles'
import { FiscalAccumulatorTaskTableItem } from './types'

export type BodyCellProps = ReturnType<GetComponentProps<FiscalAccumulatorTaskTableItem>> & {
  bgColor?: string
}

const BodyCell: FC<BodyCellProps> = ({ bgColor, ...props }) => (
  <BodyCellStyled $bgColor={bgColor} {...props} />
)

export const components: TableComponents<FiscalAccumulatorTaskTableItem> = {
  body: {
    cell: BodyCell,
  },
}
