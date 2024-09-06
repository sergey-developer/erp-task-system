import { TaskModel } from 'modules/task/models'
import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'

import { StringMap } from 'shared/types/utils'

import {
  TaskCountersFastFilterEnum,
  TaskDetailsTabsEnum,
  TaskExtendedStatusEnum,
  TasksFastFilterEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from './enums'

export const tasksFastFilterNamesDict: StringMap<TasksFastFilterEnum> = {
  [TasksFastFilterEnum.AllInLine]: 'Все',
  [TasksFastFilterEnum.Mine]: 'Мои',
  [TasksFastFilterEnum.Overdue]: 'Просроченные',
  [TasksFastFilterEnum.Free]: 'Свободные',
  [TasksFastFilterEnum.LessOneHour]: 'Менее 1 часа',
  [TasksFastFilterEnum.LessThreeHours]: 'Менее 3-х часов',
  [TasksFastFilterEnum.Returned]: 'На доработку',
  [TasksFastFilterEnum.ReclassificationDenied]: 'Отказ в переклассификации',
}

export const taskCountersFastFilterNamesDict: StringMap<TaskCountersFastFilterEnum> = {
  [TaskCountersFastFilterEnum.AllLines]: 'Все',
  [TaskCountersFastFilterEnum.FirstLine]: 'Первая линия',
  [TaskCountersFastFilterEnum.SecondLine]: 'Вторая линия',
}

export const taskStatusDict: Readonly<StringMap<TaskStatusEnum>> = {
  [TaskStatusEnum.New]: 'Новая',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.Completed]: 'Выполнена',
  [TaskStatusEnum.Closed]: 'Закрыта',
}

export const taskTypeDict: Readonly<StringMap<TaskTypeEnum>> = {
  [TaskTypeEnum.Request]: 'ЗНО',
  [TaskTypeEnum.RequestTask]: 'Задание на ЗНО',
  [TaskTypeEnum.Incident]: 'Инцидент',
  [TaskTypeEnum.IncidentTask]: 'Задание на инцидент',
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

export const taskImpactMap: Map<TaskModel['initialImpact'], string> = new Map([
  [1, '1-всеохватывающее/широкое'],
  [2, '2-значительное/большое'],
  [3, '3-умеренное/ограниченное'],
  [4, '4-малое/локализованное'],
])

export const taskSeverityMap: Map<TaskModel['severity'], string> = new Map([
  [1, '1-критическая'],
  [2, '2-высокая'],
  [3, '3-средняя'],
  [4, '4-низкая'],
])

export const taskPriorityMap: Map<TaskModel['priorityCode'], string> = new Map([
  [1, '1-критический'],
  [2, '2-высокий'],
  [3, '3-средний'],
  [4, '4-низкий'],
])

export const taskDetailsTabNameDict: Readonly<StringMap<TaskDetailsTabsEnum>> = {
  [TaskDetailsTabsEnum.SubTaskList]: 'Задания',
  [TaskDetailsTabsEnum.Comments]: 'Комментарии',
  [TaskDetailsTabsEnum.Resolution]: 'Решение',
  [TaskDetailsTabsEnum.Description]: 'Описание',
  [TaskDetailsTabsEnum.Journal]: 'Журнал',
  [TaskDetailsTabsEnum.RelocationTasks]: 'Перемещения',
}
