import { taskCardTabNamesDict, TaskCardTabsEnum } from 'modules/task/constants/task'

test('Словарь имен вкладок карточки заявки', () => {
  expect(taskCardTabNamesDict[TaskCardTabsEnum.SubTaskList]).toBe('Задания')
  expect(taskCardTabNamesDict[TaskCardTabsEnum.CommentList]).toBe('Комментарии')
  expect(taskCardTabNamesDict[TaskCardTabsEnum.Resolution]).toBe('Решение')
  expect(taskCardTabNamesDict[TaskCardTabsEnum.Description]).toBe('Описание')
  expect(taskCardTabNamesDict[TaskCardTabsEnum.Journal]).toBe('Журнал')
  expect(taskCardTabNamesDict[TaskCardTabsEnum.RelocationTaskList]).toBe('Перемещения')
})
