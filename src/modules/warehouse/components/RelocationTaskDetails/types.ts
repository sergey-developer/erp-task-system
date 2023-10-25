import { DrawerProps } from 'antd'

import { IdType } from 'shared/types/common'

export type RelocationTaskDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> & {
  relocationTaskId: IdType
}
