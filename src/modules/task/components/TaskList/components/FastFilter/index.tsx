import { Space } from 'antd'
import React, { FC, useMemo } from 'react'

import FilterTag from 'components/FilterTag'
import { FastFilterEnum } from 'modules/task/components/TaskList/constants/enums'

import { fastFilterNamesDict } from './constants'
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

    return Object.values(FastFilterEnum).map((fastFilterKey) => {
      const taskCounterKey =
        fastFilterKey.toLowerCase() as Lowercase<FastFilterEnum>

      const taskCounterValue = isError ? null : counters[taskCounterKey]

      return {
        text: fastFilterNamesDict[fastFilterKey],
        value: fastFilterKey,
        amount: taskCounterValue,
      }
    })
  }, [isError, data])

  return (
    <Space wrap>
      {filters.map(({ amount, text, value }) => (
        <FilterTag
          key={value}
          checked={disabled ? false : selectedFilter === value}
          onChange={disabled ? undefined : () => onChange(value)}
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
