import { InventorizationStatusEnum, InventorizationTypeEnum } from '../api/constants'

export const inventorizationTypeDict: Record<InventorizationTypeEnum, string> = {
  [InventorizationTypeEnum.Internal]: 'Внутренняя',
  [InventorizationTypeEnum.External]: 'Внешняя',
}

export const inventorizationStatusDict: Record<InventorizationStatusEnum, string> = {
  [InventorizationStatusEnum.New]: 'Новое',
  [InventorizationStatusEnum.InProgress]: 'В работе',
  [InventorizationStatusEnum.Completed]: 'Выполнено',
  [InventorizationStatusEnum.Closed]: 'Закрыто',
  [InventorizationStatusEnum.Canceled]: 'Отменено',
}
