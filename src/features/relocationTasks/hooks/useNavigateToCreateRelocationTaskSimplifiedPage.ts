import { TaskDetailDTO } from 'features/tasks/api/dto'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import pick from 'lodash/pick'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { EmptyFn } from 'shared/types/utils'

type UseNavigateToCreateRelocationTaskSimplifiedPageParams = {
  task?: Pick<
    TaskDetailDTO,
    'id' | 'recordId' | 'olaStatus' | 'olaNextBreachTime' | 'olaEstimatedTime' | 'shop' | 'assignee'
  >
  from?: string
}

export const useNavigateToCreateRelocationTaskSimplifiedPage = ({
  task,
  from,
}: UseNavigateToCreateRelocationTaskSimplifiedPageParams): EmptyFn => {
  const navigate = useNavigate()

  return useCallback(
    () =>
      navigate(WarehousesRoutesEnum.CreateRelocationTaskSimplified, {
        state: {
          task: pick(
            task,
            'id',
            'recordId',
            'shop',
            'assignee',
            'olaNextBreachTime',
            'olaEstimatedTime',
            'olaStatus',
          ),
          from,
        },
      }),
    [from, navigate, task],
  )
}
