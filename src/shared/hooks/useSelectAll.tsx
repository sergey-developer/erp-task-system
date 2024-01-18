import { Button, SelectProps } from 'antd'
import { useCallback, useMemo } from 'react'

type UseSelectAllProps = SelectProps & { showSelectAll?: boolean }

export const useSelectAll = ({
  showSelectAll = true,
  options = [],
  value,
  onChange,
}: UseSelectAllProps) => {
  const handleSelectAll = useCallback(() => {
    onChange?.(
      options.map((option) => option.value),
      options,
    )
  }, [onChange, options])

  const handleUnselectAll = useCallback(() => {
    onChange?.([], [])
  }, [onChange])

  const extendedOptions = useMemo(() => {
    if (!showSelectAll) return options

    return [
      {
        label:
          value?.length !== options?.length ? (
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
  }, [handleSelectAll, handleUnselectAll, options, showSelectAll, value?.length])

  return {
    options: extendedOptions,
    value,
    onChange,
  }
}
