import { SearchQueries } from '../TaskListPage/interfaces'

export const searchQueriesDictionary: Record<keyof SearchQueries, string> = {
  searchByTitle: 'Тема',
  searchByName: 'Объект',
  searchByAssignee: 'Исполнитель',
}
