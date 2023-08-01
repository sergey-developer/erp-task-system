import { Space } from 'antd'
import { camelize } from 'humps'
import isEqual from 'lodash/isEqual'
import React, { FC, useMemo } from 'react'

import FilterTag from './FastFilterListItem'
import { fastFilters } from './constants'
import { FastFilterListProps, FastFilterItem } from './types'

const FastFilterList: FC<FastFilterListProps> = ({
  data,
  isShowCounters,
  isLoading,
  onChange,
  selectedFilter,
  disabled,
  userRole,
}) => {
  const filters: Array<FastFilterItem> = useMemo(() => {
    const counters = (data || {}) as NonNullable<typeof data>

    return fastFilters.reduce<Array<FastFilterItem>>(
      (acc, { filter, roles, text }) => {
        const taskCounterKey = camelize(filter.toLowerCase()) as Lowercase<
          typeof filter
        >
        const taskCounterValue = isShowCounters
          ? counters[taskCounterKey]
          : null

        if (userRole && roles.includes(userRole)) {
          acc.push({
            text,
            value: filter,
            amount: taskCounterValue,
          })
        }

        return acc
      },
      [],
    )
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
