import { StringMap } from 'shared/interfaces/utils'

export enum FastFilterEnum {
  All = 'ALL',
  Free = 'FREE',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
  Closed = 'CLOSED',
}

export const fastFilterNamesDict: StringMap<FastFilterEnum> = {
  [FastFilterEnum.All]: 'Все',
  [FastFilterEnum.Mine]: 'Мои',
  [FastFilterEnum.Overdue]: 'Просроченные',
  [FastFilterEnum.Free]: 'Свободные',
  [FastFilterEnum.Closed]: 'Закрытые',
}
