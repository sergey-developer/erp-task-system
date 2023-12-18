import { Space } from 'antd'
import { camelize } from 'humps'
import isEqual from 'lodash/isEqual'
import React, { FC, useMemo } from 'react'

import { TaskCountersKeys } from 'modules/task/models'

import FilterTag from './FastFilterListItem'
import { fastFilters } from './constants'
import { FastFilterItem, FastFilterListProps } from './types'

const FastFilterList: FC<FastFilterListProps> = ({
  data,
  isShowCounters,
  isLoading,
  onChange,
  selectedFilter,
  disabled,
  userRole,
}) => {
  const filters: FastFilterItem[] = useMemo(() => {
    const counters = (data || {}) as NonNullable<typeof data>

    return fastFilters.reduce<FastFilterItem[]>((acc, { filter, roles, text }) => {
      const taskCounterKey = camelize(filter.toLowerCase()) as TaskCountersKeys
      const taskCounterValue = isShowCounters ? counters[taskCounterKey] : null

      if (userRole && roles.includes(userRole)) {
        acc.push({
          text,
          value: filter,
          amount: taskCounterValue,
        })
      }

      return acc
    }, [])
  }, [data, isShowCounters, userRole])

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

export default FastFilterList
