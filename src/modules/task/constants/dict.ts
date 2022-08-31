import { StringMap } from 'shared/interfaces/utils'

import { TaskJournalTypeEnum, TaskStatusEnum } from './enums'

export const taskStatusDict: Partial<StringMap<TaskStatusEnum>> = {
  [TaskStatusEnum.New]: 'Ожидает выполнения',
  [TaskStatusEnum.Appointed]: 'Назначено',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.Returned]: 'Возврат заявителем',
  [TaskStatusEnum.Completed]: 'Выполнено',
}

export const taskExtendedStatusDict: StringMap<TaskStatusEnum> = {
  [TaskStatusEnum.New]: 'Новая',
  [TaskStatusEnum.Appointed]: 'Назначена',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.InReclassification]: 'На переклассификации',
  [TaskStatusEnum.Awaiting]: 'В ожидании',
  [TaskStatusEnum.Returned]: 'Возвращена',
  [TaskStatusEnum.Completed]: 'Выполнена',
  [TaskStatusEnum.Closed]: 'Закрыта',
}

export const journalEntryTypeDict: StringMap<TaskJournalTypeEnum> = {
  [TaskJournalTypeEnum.InternalCommunication]: 'Внутренняя коммуникация',
  [TaskJournalTypeEnum.ExternalCommunication]: 'Внешняя коммуникация',
  [TaskJournalTypeEnum.Awaiting]: 'Перевод в ожидание',
  [TaskJournalTypeEnum.StatusChange]: 'Изменение статуса',
  [TaskJournalTypeEnum.Reclassified]: 'Переклассификация',
  [TaskJournalTypeEnum.AssigneeChange]: 'Переназначение',
  [TaskJournalTypeEnum.TechMessage]: 'Техническое сообщение',
  [TaskJournalTypeEnum.Job]: 'Задания',
  [TaskJournalTypeEnum.Attachment]: 'Вложение',
  [TaskJournalTypeEnum.Other]: 'Другое',
}
