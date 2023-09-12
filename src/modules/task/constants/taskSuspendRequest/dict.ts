import { SuspendReasonEnum } from 'modules/task/constants'

import { StringMap } from 'shared/types/utils'

/** Порядок значений имеет значение */
export const suspendReasonDict: Readonly<StringMap<SuspendReasonEnum>> = {
  [SuspendReasonEnum.AwaitingInformation]: 'Ожидание информации от пользователя',
  [SuspendReasonEnum.AwaitingInformationFromFirstLine]:
    'Ожидание информации от пользователя, уточнение через 1-ю линию',
  [SuspendReasonEnum.AwaitingInitiator]: 'Ожидание пользователя',
  [SuspendReasonEnum.AwaitingPurchase]: 'Ожидание закупки',
  [SuspendReasonEnum.AwaitingRelease]: 'Ожидание релиза',
  [SuspendReasonEnum.AwaitingNonItWork]: 'Ожидание работ вне зоны ответственности ИТ',
}
