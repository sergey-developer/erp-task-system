import { Divider, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TableRowsApiErrors } from 'shared/services/baseApi'
import { checkLastItem } from 'shared/utils/common'

import { WrapperStyled } from './styles'

const { Text } = Typography

export type TableRowsApiErrorsProps = {
  errors: TableRowsApiErrors
}

const TableRowsErrors: FC<TableRowsApiErrorsProps> = ({ errors }) => {
  return (
    <WrapperStyled vertical gap='small'>
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
