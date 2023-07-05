import { GetComponentProps } from 'rc-table/es/interface'
import { TableComponents } from 'rc-table/es/interface'
import { FC } from 'react'

import { FiscalAccumulatorTaskTableItem } from './interfaces'
import { BodyCellStyled } from './styles'

const BodyCell: FC<
  ReturnType<GetComponentProps<FiscalAccumulatorTaskTableItem>> & {
    bgColor?: string
  }
> = ({ bgColor, ...props }) => <BodyCellStyled $bgColor={bgColor} {...props} />

export const components: TableComponents<FiscalAccumulatorTaskTableItem> = {
  body: {
    cell: BodyCell,
  },
}
