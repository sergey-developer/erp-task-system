import { SmartSearchQueries } from '../TaskListPage/interfaces'

export const smartSearchQueriesDictionary: Record<
  keyof SmartSearchQueries,
  string
> = {
  smartSearchDescription: 'Тема',
  smartSearchName: 'Объект',
  smartSearchAssignee: 'Исполнитель',
}
