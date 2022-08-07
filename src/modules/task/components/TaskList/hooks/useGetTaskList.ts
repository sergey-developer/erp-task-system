import {
  UseGetTaskListQueryReturnType,
  useGetTaskListQuery,
} from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'

import { GetTaskListQueryArgsModel } from '../models'
import { taskListApiPermissions } from '../permissions/taskList.permissions'

const useGetTaskList = (
  filter: GetTaskListQueryArgsModel,
): UseGetTaskListQueryReturnType => {
  const permissions = useUserPermissions(taskListApiPermissions.get)

  return useGetTaskListQuery(filter, {
    skip: !permissions.canGet,
  })

  // todo: добавить обработку 400, 500 ошибок когда будет ясно как их обрабатывать
}

export default useGetTaskList
