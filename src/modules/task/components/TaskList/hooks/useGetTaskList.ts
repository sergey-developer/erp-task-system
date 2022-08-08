import { useGetTaskListQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'

import { GetTaskListQueryArgsModel } from '../models'
import { taskListApiPermissions } from '../permissions/taskList.permissions'

const useGetTaskList = (filter: GetTaskListQueryArgsModel) => {
  const permissions = useUserPermissions(taskListApiPermissions.getList)

  return useGetTaskListQuery(filter, {
    skip: !permissions.canGet,
  })

  // todo: добавить обработку 400, 500 ошибок когда будет ясно как их обрабатывать
}

export default useGetTaskList
