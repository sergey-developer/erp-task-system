import { Button, SelectProps } from 'antd'
import { useCallback, useMemo } from 'react'

import { SetNonNullable } from '../../types/utils'

type UseSelectAllProps = SetNonNullable<SelectProps, 'options' | 'value' | 'onChange'> & {
  showSelectAll?: boolean
}

export const useSelectAll = ({
  showSelectAll = true,
  options = [],
  value,
  onChange,
}: UseSelectAllProps) => {
  const optionsValues = useMemo(
    () =>
      options.reduce<(string | number)[]>((acc, option) => {
        if (option.options) {
          return [...acc, ...option.options.map((opt: { value: any }) => opt.value)]
        } else if (option.value) {
          acc.push(option.value)
        }
        return acc
      }, []),
    [options],
  )

  const handleSelectAll = useCallback(() => {
    onChange(optionsValues, options)
  }, [onChange, options, optionsValues])

  const handleUnselectAll = useCallback(() => {
    onChange([], [])
  }, [onChange])

  const extendedOptions = useMemo(() => {
    if (!showSelectAll) return options

    return [
      {
        label:
          value?.length !== optionsValues?.length ? (
            <Button type='link' onClick={handleSelectAll}>
              Выбрать все
            </Button>
          ) : (
            <Button type='link' onClick={handleUnselectAll}>
              Сбросить все
            </Button>
          ),
      },
      ...options,
    ]
  }, [
    handleSelectAll,
    handleUnselectAll,
    options,
    optionsValues?.length,
    showSelectAll,
    value?.length,
  ])

  return {
    options: extendedOptions,
    value,
    onChange,
  }
}
