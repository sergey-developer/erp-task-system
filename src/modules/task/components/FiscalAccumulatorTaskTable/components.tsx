import { GetComponentProps } from 'rc-table/es/interface'
import { TableComponents } from 'rc-table/es/interface'
import { FC } from 'react'

import { FiscalAccumulatorTaskTableItem } from './types'
import { BodyCellStyled } from './styles'

export type BodyCellProps = ReturnType<
  GetComponentProps<FiscalAccumulatorTaskTableItem>
> & {
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
