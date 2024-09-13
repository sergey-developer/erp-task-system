import { SelectProps } from 'antd'
import { DefaultOptionType } from 'rc-select/lib/Select'

import { MatchedUserPermissions } from 'modules/user/utils'

import {
  externalRelocationStatusDict,
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from './dict'
import { RelocationTaskStatusEnum, RelocationTaskTypeEnum } from './enums'

export const relocationTaskStatusOptions: SelectProps['options'] = [
  {
    label: relocationTaskStatusDict[RelocationTaskStatusEnum.New],
    value: RelocationTaskStatusEnum.New,
  },
  {
    label: relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
    value: RelocationTaskStatusEnum.Completed,
  },
  {
    label: relocationTaskStatusDict[RelocationTaskStatusEnum.Returned],
    value: RelocationTaskStatusEnum.Returned,
  },
  {
    label: relocationTaskStatusDict[RelocationTaskStatusEnum.Closed],
    value: RelocationTaskStatusEnum.Closed,
  },
  {
    label: relocationTaskStatusDict[RelocationTaskStatusEnum.Canceled],
    value: RelocationTaskStatusEnum.Canceled,
  },
]

// relocation task type options
export type RelocationTaskTypeOption = DefaultOptionType & {
  shouldDisable?: (permissions: MatchedUserPermissions) => boolean
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
    shouldDisable: (permissions) => !permissions.enteringBalances,
  },
]

export const externalRelocationStatusOptions: SelectProps['options'] = Object.keys(
  externalRelocationStatusDict,
).map((key) => ({
  label: externalRelocationStatusDict[key as keyof typeof externalRelocationStatusDict],
  value: key,
}))
