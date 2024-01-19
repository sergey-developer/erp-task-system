import sortBy from 'lodash/sortBy'
import { DefaultOptionType } from 'rc-select/lib/Select'

import { TaskJournalTypeEnum } from 'modules/task/constants/taskJournal'

import { StringMap } from 'shared/types/utils'

export const NO_DATA_MSG: string = 'Записей пока нет'

export const journalEntryTypeDict: Readonly<StringMap<TaskJournalTypeEnum>> = {
  [TaskJournalTypeEnum.StatusChange]: 'Изменение статуса',
  [TaskJournalTypeEnum.AssigneeChange]: 'Переназначение',
  [TaskJournalTypeEnum.TechMessage]: 'Техническое сообщение',
  [TaskJournalTypeEnum.SubtaskCreated]: 'Создано задание',
  [TaskJournalTypeEnum.Returned]: 'Возврат на доработку',
  [TaskJournalTypeEnum.Job]: 'Задания',
  [TaskJournalTypeEnum.AttachmentDeleted]: 'Вложение удалено',
  [TaskJournalTypeEnum.InternalCommunication]: 'Внутренняя коммуникация',
  [TaskJournalTypeEnum.ExternalCommunication]: 'Внешняя коммуникация',
  [TaskJournalTypeEnum.Awaiting]: 'Перевод в ожидание',
  [TaskJournalTypeEnum.AwaitingCreated]: 'Создан запрос на перевод в ожидание',
  [TaskJournalTypeEnum.AwaitingApproved]: 'Перевод в ожидание согласован',
  [TaskJournalTypeEnum.AwaitingRejected]: 'Перевод в ожидание отклонен',
  [TaskJournalTypeEnum.ReclassificationCreated]: 'Создан запрос на переклассификацию',
  [TaskJournalTypeEnum.ReclassificationApproved]: 'Переклассификация одобрена',
  [TaskJournalTypeEnum.ReclassificationRejected]: 'Переклассификация отклонена',
  [TaskJournalTypeEnum.ReclassificationCancelled]: 'Запрос на переклассификацию отменен',
  [TaskJournalTypeEnum.FirstLineReturned]: 'Возврат на первую линию',
  [TaskJournalTypeEnum.AwaitingCanceled]: 'Перевод в ожидание отменен',
  [TaskJournalTypeEnum.AutoEscalation]: 'Автоэскалация',
  [TaskJournalTypeEnum.ReassignmentSupportGroup]: 'Переназначение на другую ГП',
  [TaskJournalTypeEnum.Other]: 'Другое',
}

export const journalTypeOptions: DefaultOptionType[] = sortBy(
  Object.keys(journalEntryTypeDict).map((key) => ({
    label: journalEntryTypeDict[key as TaskJournalTypeEnum],
    value: key,
  })),
  'label',
)
