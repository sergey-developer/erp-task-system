import { Space } from 'antd'
import { camelize } from 'humps'
import isEqual from 'lodash/isEqual'
import React, { FC, useMemo } from 'react'

import { TaskCountersKeys } from 'modules/task/models'

import FilterTag from './FastFilterListItem'
import { FastFilterItem, FastFiltersProps } from './types'

const FastFilters: FC<FastFiltersProps> = ({
  config,
  counters: initialCounters,
  isShowCounters,
  isLoading,
  onChange,
  selectedFilter,
  disabled,
  permissions,
}) => {
  const filters: FastFilterItem[] = useMemo(() => {
    const counters = (initialCounters || {}) as NonNullable<typeof initialCounters>

    return config.reduce<FastFilterItem[]>((acc, { filter, canShow, text }) => {
      const taskCounterKey = camelize(filter.toLowerCase()) as TaskCountersKeys
      const taskCounterValue = isShowCounters ? counters[taskCounterKey] : null
      const result = { text, value: filter, amount: taskCounterValue }

      if (!canShow) acc.push(result)
      else if (canShow(permissions)) acc.push(result)

      return acc
    }, [])
  }, [config, initialCounters, isShowCounters, permissions])

  return (
    <Space data-testid='fast-filter-list' wrap>
      {filters.map(({ amount, text, value }) => (
        <FilterTag
          key={value}
          checked={isEqual(selectedFilter, value)}
          onChange={() => onChange(value)}
          value={value}
          text={text}
          amount={amount}
          loading={isLoading}
          disabled={disabled}
        />
      ))}
    </Space>
  )
}

export default FastFilters
