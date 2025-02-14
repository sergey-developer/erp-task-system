import { DrawerProps } from 'antd'
import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'
import { UseGetRelocationTasksResult } from 'features/relocationTasks/hooks'

import { IdType } from 'shared/types/common'

export type RelocationTaskDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> &
  Partial<Pick<ExecuteInventorizationPageLocationState, 'inventorization'>> & {
    relocationTaskId: IdType
    refetchRelocationTasks?: UseGetRelocationTasksResult['refetch']
  }
