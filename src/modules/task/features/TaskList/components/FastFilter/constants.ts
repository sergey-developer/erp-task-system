import { FastFilterEnum } from 'modules/task/features/TaskList/constants/common'
import { StringMap } from 'shared/interfaces/utils'

export const fastFilterNamesDict: StringMap<FastFilterEnum> = {
  [FastFilterEnum.All]: 'Все',
  [FastFilterEnum.Mine]: 'Мои',
  [FastFilterEnum.Overdue]: 'Просроченные',
  [FastFilterEnum.Free]: 'Свободные',
  [FastFilterEnum.Closed]: 'Закрытые',
}
