import { TaskJournalTypeEnum } from 'modules/task/constants/common'
import { StringMap } from 'shared/interfaces/utils'

export const NO_DATA_MSG: string = 'Записей пока нет'

export const journalEntryTypeDict: Readonly<StringMap<TaskJournalTypeEnum>> = {
  [TaskJournalTypeEnum.StatusChange]: 'Изменение статуса',
  [TaskJournalTypeEnum.AssigneeChange]: 'Переназначение',
  [TaskJournalTypeEnum.TechMessage]: 'Техническое сообщение',
  [TaskJournalTypeEnum.Returned]: 'Возврат на доработку',
  [TaskJournalTypeEnum.Job]: 'Задания',
  [TaskJournalTypeEnum.Attachment]: 'Вложение',
  [TaskJournalTypeEnum.InternalCommunication]: 'Внутренняя коммуникация',
  [TaskJournalTypeEnum.ExternalCommunication]: 'Внешняя коммуникация',
  [TaskJournalTypeEnum.AwaitingCreated]: 'Создан запрос на перевод в ожидание',
  [TaskJournalTypeEnum.AwaitingApproved]: 'Перевод в ожидание согласован',
  [TaskJournalTypeEnum.AwaitingRejected]: 'Перевод в ожидание отклонен',
  [TaskJournalTypeEnum.ReclassificationCreated]:
    'Создан запрос на переклассификацию',
  [TaskJournalTypeEnum.ReclassificationApproved]: 'Переклассификация одобрена',
  [TaskJournalTypeEnum.ReclassificationRejected]: 'Переклассификация отклонена',
  [TaskJournalTypeEnum.ReclassificationCancelled]:
    'Запрос на переклассификацию отменен',
  [TaskJournalTypeEnum.FirstLineReturned]: 'Возврат на первую линию',
  [TaskJournalTypeEnum.Other]: 'Другое',
}
