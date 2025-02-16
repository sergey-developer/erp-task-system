import { TaskDetailDTO } from 'features/tasks/api/dto'
import { TasksFiltersStorageType } from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'
import { TaskFastFilterByLinesType, TasksFastFilterType } from 'features/tasks/types'

import { StringMap } from 'shared/types/utils'

import {
  ExternalResponsibleCompanyEnum,
  ReclassificationReasonEnum,
  SuspendReasonEnum,
  TaskExtendedStatusEnum,
  TasksFastFilterEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from '../api/constants'
import { TaskDetailsTabsEnum } from './enums'

export const fastFilterNamesDict: StringMap<
  Exclude<TasksFastFilterType, TasksFastFilterEnum.FirstLine | TasksFastFilterEnum.SecondLine>
> = {
  [TasksFastFilterEnum.AllLines]: 'Все',
  [TasksFastFilterEnum.Mine]: 'Мои',
  [TasksFastFilterEnum.Overdue]: 'Просроченные',
  [TasksFastFilterEnum.Free]: 'Свободные',
  [TasksFastFilterEnum.LessOneHour]: 'Менее 1 часа',
  [TasksFastFilterEnum.LessThreeHours]: 'Менее 3-х часов',
  [TasksFastFilterEnum.Returned]: 'На доработку',
  [TasksFastFilterEnum.ReclassificationDenied]: 'Отказ в переклассификации',
}

export const fastFilterByLinesNamesDict: StringMap<TaskFastFilterByLinesType> = {
  [TasksFastFilterEnum.AllLines]: 'Все',
  [TasksFastFilterEnum.FirstLine]: 'Первая линия',
  [TasksFastFilterEnum.SecondLine]: 'Вторая линия',
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

export const taskImpactMap: Map<TaskDetailDTO['initialImpact'], string> = new Map([
  [1, '1-всеохватывающее/широкое'],
  [2, '2-значительное/большое'],
  [3, '3-умеренное/ограниченное'],
  [4, '4-малое/локализованное'],
])

export const taskSeverityMap: Map<TaskDetailDTO['severity'], string> = new Map([
  [1, '1-критическая'],
  [2, '2-высокая'],
  [3, '3-средняя'],
  [4, '4-низкая'],
])

export const taskPriorityMap: Map<TaskDetailDTO['priorityCode'], string> = new Map([
  [1, '1-критический'],
  [2, '2-высокий'],
  [3, '3-средний'],
  [4, '4-низкий'],
])

export const taskDetailsTabNameDict: Readonly<StringMap<TaskDetailsTabsEnum>> = {
  [TaskDetailsTabsEnum.SubTasks]: 'Задания',
  [TaskDetailsTabsEnum.Comments]: 'Комментарии',
  [TaskDetailsTabsEnum.Resolution]: 'Решение',
  [TaskDetailsTabsEnum.Description]: 'Описание',
  [TaskDetailsTabsEnum.Journal]: 'Журнал',
  [TaskDetailsTabsEnum.RelocationTasks]: 'Перемещения',
}

export const reclassificationReasonDict: Record<ReclassificationReasonEnum, string> = {
  [ReclassificationReasonEnum.WrongClassification]:
    'Классификация не соответствует содержанию обращения',
  [ReclassificationReasonEnum.WrongSupportGroup]: 'Группа поддержки не соответствует классификации',
  [ReclassificationReasonEnum.DivideTask]: 'Требуется разбить обращение',
}

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
