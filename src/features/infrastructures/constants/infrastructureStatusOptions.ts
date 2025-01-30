import { DefaultOptionType } from 'rc-select/lib/Select'

import { infrastructureStatusDict } from './dict'
import { InfrastructureStatusEnum } from './enums'

export const infrastructureStatusOptions: DefaultOptionType[] = [
  {
    label: infrastructureStatusDict[InfrastructureStatusEnum.New],
    value: InfrastructureStatusEnum.New,
  },
  {
    label: infrastructureStatusDict[InfrastructureStatusEnum.OrderDrawing],
    value: InfrastructureStatusEnum.OrderDrawing,
  },
  {
    label: infrastructureStatusDict[InfrastructureStatusEnum.ToComplete],
    value: InfrastructureStatusEnum.ToComplete,
  },
  {
    label: infrastructureStatusDict[InfrastructureStatusEnum.Completed],
    value: InfrastructureStatusEnum.Completed,
  },
  {
    label: infrastructureStatusDict[InfrastructureStatusEnum.Returned],
    value: InfrastructureStatusEnum.Returned,
  },
  {
    label: infrastructureStatusDict[InfrastructureStatusEnum.Canceled],
    value: InfrastructureStatusEnum.Canceled,
  },
  {
    label: infrastructureStatusDict[InfrastructureStatusEnum.Suspended],
    value: InfrastructureStatusEnum.Suspended,
  },
  {
    label: infrastructureStatusDict[InfrastructureStatusEnum.ApproveAwaiting],
    value: InfrastructureStatusEnum.ApproveAwaiting,
  },
]
