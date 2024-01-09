import { taskDetailsTabNameDict, TaskDetailsTabsEnum } from 'modules/task/constants/task'

test('Словарь имен вкладок карточки заявки', () => {
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.SubTaskList]).toBe('Задания')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.CommentList]).toBe('Комментарии')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.Resolution]).toBe('Решение')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.Description]).toBe('Описание')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.Journal]).toBe('Журнал')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.RelocationTaskList]).toBe('Перемещения')
})
