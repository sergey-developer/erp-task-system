import { Space } from 'antd'
import React, { FC, useMemo } from 'react'

import { FastFilterEnum } from 'modules/task/features/TaskList/constants/common'
import { isEqual } from 'shared/utils/common/isEqual'

import { fastFilterNamesDict } from './constants'
import FilterTag from './FilterTag'
import { FastFilterProps, FilterItem } from './interfaces'

const FastFilter: FC<FastFilterProps> = ({
  data,
  isError,
  isLoading,
  onChange,
  selectedFilter,
  disabled,
}) => {
  const filters: Array<FilterItem> = useMemo(() => {
    const counters = (data || {}) as NonNullable<typeof data>

    return Object.values(FastFilterEnum).map((fastFilter) => {
      const taskCounterKey =
        fastFilter.toLowerCase() as Lowercase<FastFilterEnum>

      const taskCounterValue = isError ? null : counters[taskCounterKey]

      return {
        text: fastFilterNamesDict[fastFilter],
        value: fastFilter,
        amount: taskCounterValue,
      }
    })
  }, [isError, data])

  return (
    <Space data-testid='filter-fast' wrap>
      {filters.map(({ amount, text, value }) => (
        <FilterTag
          key={value}
          checked={isEqual(selectedFilter, value)}
          onChange={() => onChange(value)}
          text={text}
          amount={amount}
          loading={isLoading}
          disabled={disabled}
        />
      ))}
    </Space>
  )
}

export default FastFilter
