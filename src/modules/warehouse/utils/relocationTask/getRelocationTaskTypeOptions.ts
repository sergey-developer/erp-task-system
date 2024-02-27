import { SelectProps } from 'antd'

import { MatchExpectedPermissionsResult } from 'modules/user/utils'
import { relocationTaskTypeOptions } from 'modules/warehouse/constants/relocationTask'

export const getRelocationTaskTypeOptions = (
  permissions: MatchExpectedPermissionsResult,
): SelectProps['options'] =>
  relocationTaskTypeOptions.map((opt) => ({
    ...opt,
    disabled: opt.hasPermissions && !opt.hasPermissions(permissions),
  }))
