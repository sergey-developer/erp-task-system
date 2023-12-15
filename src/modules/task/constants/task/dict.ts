import { BaseTaskModel } from 'modules/task/models'
import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'

import { StringMap } from 'shared/types/utils'

import { FastFilterEnum, TaskCardTabsEnum, TaskExtendedStatusEnum, TaskStatusEnum } from './enums'

export const fastFilterNamesDict: StringMap<FastFilterEnum> = {
  [FastFilterEnum.All]: 'Все',
  [FastFilterEnum.Mine]: 'Мои',
  [FastFilterEnum.Overdue]: 'Просроченные',
  [FastFilterEnum.Free]: 'Свободные',
  [FastFilterEnum.FirstLine]: 'Первая линия',
  [FastFilterEnum.SecondLine]: 'Вторая линия',
  [FastFilterEnum.LessOneHour]: 'Менее 1 часа',
  [FastFilterEnum.LessThreeHours]: 'Менее 3-х часов',
}

export const taskStatusDict: Readonly<StringMap<TaskStatusEnum>> = {
  [TaskStatusEnum.New]: 'Новая',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.Completed]: 'Выполнена',
  [TaskStatusEnum.Closed]: 'Закрыта',
}

export const taskExtendedStatusDict: Readonly<Partial<StringMap<TaskExtendedStatusEnum>>> = {
  [TaskExtendedStatusEnum.New]: 'Новые',
  [TaskExtendedStatusEnum.InProgress]: 'В работе',
  [TaskExtendedStatusEnum.Completed]: 'Выполнено',
  [TaskExtendedStatusEnum.Awaiting]: 'В ожидании',
  [TaskExtendedStatusEnum.InReclassification]: 'На переклассификации',
  [TaskExtendedStatusEnum.Returned]: 'Возврат заявителем',
  [TaskExtendedStatusEnum.Closed]: 'Закрытые',
}

export const tasksFiltersDict: Readonly<StringMap<keyof TasksFiltersStorageType>> = {
  customers: 'Клиенты',
  macroregions: 'Макрорегионы',
  supportGroups: 'Группы поддержки',
}

export const taskImpactMap: Map<BaseTaskModel['initialImpact'], string> = new Map([
  [1, '1-всеохватывающее/широкое'],
  [2, '2-значительное/большое'],
  [3, '3-умеренное/ограниченное'],
  [4, '4-малое/локализованное'],
])

export const taskSeverityMap: Map<BaseTaskModel['severity'], string> = new Map([
  [1, '1-критическая'],
  [2, '2-высокая'],
  [3, '3-средняя'],
  [4, '4-низкая'],
])

export const taskPriorityMap: Map<BaseTaskModel['priorityCode'], string> = new Map([
  [1, '1-критический'],
  [2, '2-высокий'],
  [3, '3-средний'],
  [4, '4-низкий'],
])

export const taskCardTabNamesDict: Readonly<StringMap<TaskCardTabsEnum>> = {
  [TaskCardTabsEnum.SubTaskList]: 'Задания',
  [TaskCardTabsEnum.CommentList]: 'Комментарии',
  [TaskCardTabsEnum.Resolution]: 'Решение',
  [TaskCardTabsEnum.Description]: 'Описание',
  [TaskCardTabsEnum.Journal]: 'Журнал',
  [TaskCardTabsEnum.RelocationTaskList]: 'Перемещения',
}
