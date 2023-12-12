import { StringMap } from 'shared/types/utils'

import { ExternalResponsibleCompanyEnum, SuspendReasonEnum } from './enums'

/** Порядок значений имеет значение */
export const suspendReasonDict: Readonly<StringMap<SuspendReasonEnum>> = {
  [SuspendReasonEnum.AwaitingInformation]: 'Ожидание информации от пользователя',
  [SuspendReasonEnum.AwaitingInformationFromFirstLine]:
    'Ожидание информации от пользователя, уточнение через 1-ю линию',
  [SuspendReasonEnum.AwaitingInitiator]: 'Ожидание пользователя',
  [SuspendReasonEnum.AwaitingPurchase]: 'Ожидание закупки',
  [SuspendReasonEnum.AwaitingRelease]: 'Ожидание релиза/доработки',
  [SuspendReasonEnum.AwaitingNonItWork]: 'Ожидание работ вне зоны ответственности ИТ',
}

export const externalResponsibleCompanyDict: Readonly<StringMap<ExternalResponsibleCompanyEnum>> = {
  [ExternalResponsibleCompanyEnum.BusinessDepartmentX5]: 'Бизнес-подразделение Х5',
  [ExternalResponsibleCompanyEnum.OutsideOrganization]: 'Сторонняя организация (нет контракта)',
}
