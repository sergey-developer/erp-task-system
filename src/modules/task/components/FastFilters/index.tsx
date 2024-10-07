import { Space } from 'antd'
import React, { useMemo } from 'react'

import FastFilterOption from './FastFilterOption'
import { FastFilterItem, FastFiltersProps } from './types'

const FastFilters = <Value extends string, Counters extends Record<string, number>>({
  options: initialOptions,
  value,
  onChange,

  counters: initialCounters,
  countersVisible,

  disabled,
  loading,

  ...props
}: FastFiltersProps<Value, Counters>) => {
  const options: FastFilterItem<Value>[] = useMemo(() => {
    const counters = initialCounters || ({} as Counters)
    return initialOptions.map((option) => {
      const counterValue = countersVisible ? counters[option.counterKey] : undefined
      return { label: option.label, value: option.value, counter: counterValue }
    })
  }, [countersVisible, initialCounters, initialOptions])

  return (
    <Space {...props} wrap>
      {options.map((option) => (
        <FastFilterOption
          key={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          value={option.value}
          label={option.label}
          counter={option.counter}
          loading={loading}
          disabled={disabled}
        />
      ))}
    </Space>
  )
}

export default FastFilters
