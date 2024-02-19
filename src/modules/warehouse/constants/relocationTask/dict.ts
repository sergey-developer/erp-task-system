import {
  ExternalRelocationStatusEnum,
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from './enums'

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
  [RelocationTaskTypeEnum.Customer]: 'Поступление от заказчика',
}

export const externalRelocationStatusDict: Record<ExternalRelocationStatusEnum, string> = {
  [ExternalRelocationStatusEnum.InTransit]: 'В пути',
  [ExternalRelocationStatusEnum.ToApprovalSsi]: 'На согласовании ССИ',
  [ExternalRelocationStatusEnum.ToApprovalVsi]: 'На согласовании ВСИ',
  [ExternalRelocationStatusEnum.ToApprovalMrp]: 'На согласовании МРП',
  [ExternalRelocationStatusEnum.Closed]: 'Закрыто',
  [ExternalRelocationStatusEnum.Reversed]: 'Сторнировано',
}
