import { TaskJournalTypeEnum } from 'modules/task/constants/enums'
import { StringMap } from 'shared/interfaces/utils'

export const NO_DATA_MSG = 'Записей пока нет'

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
