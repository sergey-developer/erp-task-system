import { useGetReclassificationRequestQuery } from 'modules/task/services/taskReclassificationRequestApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { MaybeUndefined } from 'shared/interfaces/utils'

import { GetTaskReclassificationRequestQueryArgsModel } from '../models'
import { taskReclassificationRequestApiPermissions } from '../permissions/taskReclassificationRequest.permissions'

const useGetTaskReclassificationRequest = (
  taskId: MaybeUndefined<GetTaskReclassificationRequestQueryArgsModel>,
) => {
  const permissions = useUserPermissions(
    taskReclassificationRequestApiPermissions,
  )

  return useGetReclassificationRequestQuery(taskId!, {
    skip: !taskId || !permissions.canGet,
  })
}

export default useGetTaskReclassificationRequest
