import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

export type RelocationTaskListFilterFormFields = Partial<{
  status: RelocationTaskStatusEnum[]
  type: RelocationTaskTypeEnum[]
}>

export type RelocationTaskListFilterProps = Pick<DrawerFilterProps, 'open' | 'onClose'> & {
  values?: RelocationTaskListFilterFormFields
  initialValues: RelocationTaskListFilterFormFields

  onApply: (values: RelocationTaskListFilterFormFields) => void
}
