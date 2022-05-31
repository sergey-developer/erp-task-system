import {
  UseGetTaskListQueryReturnType,
  useGetTaskListQuery,
} from 'modules/tasks/tasks.service'
import useUserRole from 'modules/user/hooks/useUserRole'

import { GetTaskListQueryArgsModel } from '../models'

const useGetTaskList = (
  filter: GetTaskListQueryArgsModel,
): UseGetTaskListQueryReturnType => {
  const {
    isEngineerRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
    isFirstLineSupportRole,
  } = useUserRole()

  const shouldSkip: boolean = !(
    isEngineerRole ||
    isSeniorEngineerRole ||
    isHeadOfDepartmentRole ||
    isFirstLineSupportRole
  )

  const result = useGetTaskListQuery(filter, {
    skip: shouldSkip,
  })

  // todo: добавить обработку 400, 500 ошибок когда будет ясно как их обрабатывать

  return result
}

export default useGetTaskList
