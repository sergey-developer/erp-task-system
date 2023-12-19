import { RelocationTaskStatusEnum, RelocationTaskTypeEnum } from './enums'

export const relocationTaskStatusDict: Record<RelocationTaskStatusEnum, string> = {
  [RelocationTaskStatusEnum.New]: 'Новая',
  [RelocationTaskStatusEnum.Completed]: 'Выполненная',
  [RelocationTaskStatusEnum.Returned]: 'Возвращено на доработку',
  [RelocationTaskStatusEnum.Closed]: 'Закрытая',
  [RelocationTaskStatusEnum.Canceled]: 'Отмененная',
}

export const relocationTaskTypeDict: Record<RelocationTaskTypeEnum, string> = {
  [RelocationTaskTypeEnum.Relocation]: 'Перемещение',
  [RelocationTaskTypeEnum.Repair]: 'Ремонт',
  [RelocationTaskTypeEnum.Warranty]: 'Гарантийное обслуживание',
  [RelocationTaskTypeEnum.WriteOff]: 'Списание',
}
