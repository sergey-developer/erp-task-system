import { useCallback, useEffect } from 'react'

import { useCreateReclassificationRequestMutation } from 'modules/task/services/taskReclassificationRequestApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

import { CreateTaskReclassificationRequestMutationArgsModel } from '../models'
import { taskReclassificationRequestApiPermissions } from '../permissions/taskReclassificationRequest.permissions'

const useCreateTaskReclassificationRequest = () => {
  const [mutation, state] = useCreateReclassificationRequestMutation()
  const permissions = useUserPermissions(
    taskReclassificationRequestApiPermissions.createRequest,
  )

  const fn = useCallback(
    async (data: CreateTaskReclassificationRequestMutationArgsModel) => {
      if (!permissions.canCreate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.isError) return
    const error = state.error as ErrorResponse

    if (error.status === HttpStatusCodeEnum.NotFound) {
      showErrorNotification(
        'Невозможно создать запрос на переклассификацию - заявка не найдена',
      )
    } else {
      const errorDetail = getErrorDetail(error)
      showMultipleErrorNotification(errorDetail)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useCreateTaskReclassificationRequest
