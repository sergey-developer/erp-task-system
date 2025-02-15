import { FastFilterOptionProps } from './FastFilterOption'
import { FastFilterOptionType } from './options'



export type FastFilterItem<Value> = Pick<
  FastFilterOptionProps<Value>,
  'label' | 'value' | 'counter'
>

export type FastFiltersProps<Value = string, Counters = {}> = {
  options: FastFilterOptionType<Value>[]
  value?: Value
  onChange: (value: Value) => void

  loading: boolean
  disabled: boolean

  countersVisible: boolean
  counters?: Counters
}
