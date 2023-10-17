import { RelocationTaskStatusEnum } from './enums'

export const relocationTaskStatusDict: Record<RelocationTaskStatusEnum, string> = {
  [RelocationTaskStatusEnum.New]: 'Новая',
  [RelocationTaskStatusEnum.Completed]: 'Выполненная',
  [RelocationTaskStatusEnum.Returned]: 'Возвращено на доработку',
  [RelocationTaskStatusEnum.Closed]: 'Закрытая',
  [RelocationTaskStatusEnum.Canceled]: 'Отмененная',
}
