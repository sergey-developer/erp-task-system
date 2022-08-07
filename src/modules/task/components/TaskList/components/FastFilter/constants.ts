import { FastFilterEnum } from 'modules/task/components/TaskList/constants/enums'

export const fastFilterNamesDict: Record<FastFilterEnum, string> = {
  [FastFilterEnum.All]: 'Все',
  [FastFilterEnum.Mine]: 'Мои',
  [FastFilterEnum.Overdue]: 'Просроченные',
  [FastFilterEnum.Free]: 'Свободные',
  [FastFilterEnum.Closed]: 'Закрытые',
}
