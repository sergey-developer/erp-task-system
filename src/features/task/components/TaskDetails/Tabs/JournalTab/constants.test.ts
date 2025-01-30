import { TaskJournalTypeEnum } from 'features/task/constants/taskJournal'

import { journalEntryTypeDict } from './constants'

describe('Словарь типов журнала задачи', () => {
  test('StatusChange translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.StatusChange]).toEqual('Изменение статуса')
  })

  test('AssigneeChange translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.AssigneeChange]).toEqual('Переназначение')
  })

  test('TechMessage translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.TechMessage]).toEqual('Техническое сообщение')
  })

  test('SubtaskCreated translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.SubtaskCreated]).toEqual('Создано задание')
  })

  test('Returned translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.Returned]).toEqual('Возврат на доработку')
  })

  test('Job translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.Job]).toEqual('Задания')
  })

  test('AttachmentDeleted translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.AttachmentDeleted]).toEqual('Вложение удалено')
  })

  test('InternalCommunication translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.InternalCommunication]).toEqual(
      'Внутренняя коммуникация',
    )
  })

  test('ExternalCommunication translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.ExternalCommunication]).toEqual(
      'Внешняя коммуникация',
    )
  })

  test('ReclassificationCreated translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.ReclassificationCreated]).toEqual(
      'Создан запрос на переклассификацию',
    )
  })

  test('ReclassificationApproved translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.ReclassificationApproved]).toEqual(
      'Переклассификация одобрена',
    )
  })

  test('ReclassificationRejected translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.ReclassificationRejected]).toEqual(
      'Переклассификация отклонена',
    )
  })

  test('ReclassificationCancelled translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.ReclassificationCancelled]).toEqual(
      'Запрос на переклассификацию отменен',
    )
  })

  test('Awaiting translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.Awaiting]).toEqual('Перевод в ожидание')
  })

  test('AwaitingCreated translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.AwaitingCreated]).toEqual(
      'Создан запрос на перевод в ожидание',
    )
  })

  test('AwaitingApproved translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.AwaitingApproved]).toEqual(
      'Перевод в ожидание согласован',
    )
  })

  test('AwaitingRejected translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.AwaitingRejected]).toEqual(
      'Перевод в ожидание отклонен',
    )
  })

  test('FirstLineReturned translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.FirstLineReturned]).toEqual(
      'Возврат на первую линию',
    )
  })

  test('AwaitingCanceled translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.AwaitingCanceled]).toEqual(
      'Перевод в ожидание отменен',
    )
  })

  test('AutoEscalation translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.AutoEscalation]).toEqual('Автоэскалация')
  })

  test('ReassignmentSupportGroup translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.ReassignmentSupportGroup]).toEqual(
      'Переназначение на другую ГП',
    )
  })

  test('FiscalAccumulatorRegistered translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.FiscalAccumulatorRegistered]).toEqual(
      'Регистрация ФН',
    )
  })

  test('FiscalAccumulatorChangeRequest translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.FiscalAccumulatorChangeRequest]).toEqual(
      'Запрос на замену ФН',
    )
  })

  test('FiscalAccumulatorChangeNotification translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.FiscalAccumulatorChangeNotification]).toEqual(
      'Уведомление по замене ФН',
    )
  })

  test('Other translation should match the enum value', () => {
    expect(journalEntryTypeDict[TaskJournalTypeEnum.Other]).toEqual('Другое')
  })

  test('Should have expected number of keys', () => {
    const expectedKeysCount = 25
    expect(Object.keys(TaskJournalTypeEnum).length).toEqual(expectedKeysCount)
  })
})
