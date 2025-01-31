import { Divider, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TableRowsApiErrors } from 'shared/api/baseApi'
import { WithTestIdType } from 'shared/types/common'
import { checkLastItem } from 'shared/utils/common'

import { WrapperStyled } from './styles'

const { Text } = Typography

export type TableRowsApiErrorsProps = WithTestIdType & {
  errors: TableRowsApiErrors
}

const TableRowsErrors: FC<TableRowsApiErrorsProps> = ({ errors, ...props }) => {
  return (
    <WrapperStyled {...props} vertical gap='small'>
      {Object.entries(errors).map(([row, values], index, array) => (
        <Space key={index} direction='vertical'>
          <Text>
            Строка №{row}: {values.join(', ')}
          </Text>

          {!checkLastItem(index, array) && <Divider />}
        </Space>
      ))}
    </WrapperStyled>
  )
}

export default TableRowsErrors
