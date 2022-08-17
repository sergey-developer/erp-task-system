import { useGetReclassificationRequestQuery } from 'modules/task/services/taskReclassificationRequestApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'

import { GetTaskReclassificationRequestQueryArgsModel } from '../models'
import { taskReclassificationRequestApiPermissions } from '../permissions/taskReclassificationRequest.permissions'

const useGetTaskReclassificationRequest = (
  taskId: GetTaskReclassificationRequestQueryArgsModel,
) => {
  const permissions = useUserPermissions(
    taskReclassificationRequestApiPermissions,
  )

  return useGetReclassificationRequestQuery(taskId, {
    skip: !permissions.canGet,
  })
}

export default useGetTaskReclassificationRequest
