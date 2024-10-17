import { DrawerProps } from 'antd'

import { UseGetRelocationTasksResult } from 'modules/warehouse/hooks/relocationTask'

import { IdType } from 'shared/types/common'

export type RelocationTaskDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> & {
  relocationTaskId: IdType
  refetchRelocationTasks?: UseGetRelocationTasksResult['refetch']
}
