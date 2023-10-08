import { Space, Tag, Typography } from 'antd'
import isArray from 'lodash/isArray'
import size from 'lodash/size'
import { FC } from 'react'

import { ExtendedFilterFormFields } from 'modules/task/components/ExtendedFilter/types'
import { extendedFilterDict } from 'modules/task/constants/task'

const { Text } = Typography

type ExtendedFilters = Pick<
  ExtendedFilterFormFields,
  'customers' | 'macroregions' | 'supportGroups'
>

export type ExtendedFilterListItem = {
  name: keyof ExtendedFilters
  value: NonNullable<ExtendedFilters[keyof ExtendedFilters]>
}

type ExtendedFilterListProps = {
  data: ExtendedFilterListItem[]
  onClose: (item: ExtendedFilterListItem) => void
}

const ExtendedFilterList: FC<ExtendedFilterListProps> = ({ data, onClose, ...props }) => {
  return (
    <Space>
      {data.map((item, index) => (
        <Tag key={index} {...props} onClose={() => onClose(item)} closable>
          <Space>
            <Text>{extendedFilterDict[item.name]}</Text>

            {isArray(item.value) && <Text type='secondary'>{size(item.value)}</Text>}
          </Space>
        </Tag>
      ))}
    </Space>
  )
}

export default ExtendedFilterList
