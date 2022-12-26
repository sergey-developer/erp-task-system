import { TaskCardTabsEnum, taskCardTabNamesDict } from '../constants'

test('taskCardTabNamesDict / Содержит корректные имена вкладок', () => {
  expect(taskCardTabNamesDict[TaskCardTabsEnum.SubTaskList]).toBe('Задания')

  expect(taskCardTabNamesDict[TaskCardTabsEnum.CommentList]).toBe('Комментарии')

  expect(taskCardTabNamesDict[TaskCardTabsEnum.Resolution]).toBe('Решение')

  expect(taskCardTabNamesDict[TaskCardTabsEnum.Description]).toBe('Описание')

  expect(taskCardTabNamesDict[TaskCardTabsEnum.Journal]).toBe('Журнал')
})
