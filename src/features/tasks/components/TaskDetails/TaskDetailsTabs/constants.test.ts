import { taskDetailsTabNameDict, TaskDetailsTabsEnum } from 'features/tasks/constants'

test('Словарь имен вкладок карточки заявки', () => {
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.SubTasks]).toBe('Задания')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.Comments]).toBe('Комментарии')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.Resolution]).toBe('Решение')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.Description]).toBe('Описание')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.Journal]).toBe('Журнал')
  expect(taskDetailsTabNameDict[TaskDetailsTabsEnum.RelocationTasks]).toBe('Перемещения')
})
