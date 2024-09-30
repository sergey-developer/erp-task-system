import { SelectProps } from 'antd'
import { DefaultOptionType } from 'rc-select/lib/Select'

import { MatchedUserPermissions } from 'modules/user/types'

import {
  externalRelocationStatusDict,
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from './dict'
import { RelocationTaskTypeEnum } from './enums'

export const relocationTaskStatusOptions: SelectProps['options'] = Object.keys(
  relocationTaskStatusDict,
).map((key) => ({
  label: relocationTaskStatusDict[key as keyof typeof relocationTaskStatusDict],
  value: key,
}))

// relocation task type options
export type RelocationTaskTypeOption = DefaultOptionType & {
  hasPermissions?: (permissions: MatchedUserPermissions) => boolean
}

export const relocationTaskTypeOptions: RelocationTaskTypeOption[] = [
  {
    label: relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
    value: RelocationTaskTypeEnum.Relocation,
  },
  {
    label: relocationTaskTypeDict[RelocationTaskTypeEnum.Repair],
    value: RelocationTaskTypeEnum.Repair,
  },
  {
    label: relocationTaskTypeDict[RelocationTaskTypeEnum.WriteOff],
    value: RelocationTaskTypeEnum.WriteOff,
  },
  {
    label: relocationTaskTypeDict[RelocationTaskTypeEnum.ReturnWrittenOff],
    value: RelocationTaskTypeEnum.ReturnWrittenOff,
  },
  {
    label: relocationTaskTypeDict[RelocationTaskTypeEnum.Customer],
    value: RelocationTaskTypeEnum.Customer,
  },
  {
    label: relocationTaskTypeDict[RelocationTaskTypeEnum.Warranty],
    value: RelocationTaskTypeEnum.Warranty,
  },
  {
    label: relocationTaskTypeDict[RelocationTaskTypeEnum.EnteringBalances],
    value: RelocationTaskTypeEnum.EnteringBalances,
    hasPermissions: (permissions) => !!permissions.enteringBalances,
  },
]

export const externalRelocationStatusOptions: SelectProps['options'] = Object.keys(
  externalRelocationStatusDict,
).map((key) => ({
  label: externalRelocationStatusDict[key as keyof typeof externalRelocationStatusDict],
  value: key,
}))
