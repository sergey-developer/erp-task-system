/**
 Порядок значений имеет значение т.к. они отображаются с помощью `Object.values`
*/
export enum SuspendReasonDict {
  AwaitingInformation = 'Ожидание информации от пользователя',
  AwaitingInformationFromFirstLine = 'Ожидание информации от пользователя, уточнение через 1-ю линию',
  AwaitingInitiator = 'Ожидание пользователя',
  AwaitingPurchase = 'Ожидание закупки',
  AwaitingRelease = 'Ожидание релиза',
  AwaitingNonItWork = 'Ожидание работ вне зоны ответственности ИТ',
}

export const reasonsMakeDateTimeFieldDisabled = [
  SuspendReasonDict.AwaitingInformation,
  SuspendReasonDict.AwaitingInitiator,
  SuspendReasonDict.AwaitingInformationFromFirstLine,
]
