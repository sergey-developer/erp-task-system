import { TaskDetailsTabsEnum, taskDetailsTabNamesDict } from '../constants'

test('taskDetailsTabNamesDict / Содержит корректные имена вкладок', () => {
  expect(taskDetailsTabNamesDict[TaskDetailsTabsEnum.SubTaskList]).toBe(
    'Задания',
  )

  expect(taskDetailsTabNamesDict[TaskDetailsTabsEnum.CommentList]).toBe(
    'Комментарии',
  )

  expect(taskDetailsTabNamesDict[TaskDetailsTabsEnum.Resolution]).toBe(
    'Решение',
  )

  expect(taskDetailsTabNamesDict[TaskDetailsTabsEnum.Description]).toBe(
    'Описание',
  )

  expect(taskDetailsTabNamesDict[TaskDetailsTabsEnum.Journal]).toBe('Журнал')
})
