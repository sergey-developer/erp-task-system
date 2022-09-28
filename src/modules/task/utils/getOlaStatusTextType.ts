import { TextProps } from 'antd/es/typography/Text'

import { TaskOlaStatusEnum } from 'modules/task/constants/common'
import { MaybeUndefined } from 'shared/interfaces/utils'

import getOlaStatusMap from './getOlaStatusMap'

const getOlaStatusTextType = (
  olaStatus: TaskOlaStatusEnum,
): Extract<TextProps['type'], MaybeUndefined<'danger' | 'warning'>> => {
  const status = getOlaStatusMap(olaStatus)

  return status.isExpired
    ? 'danger'
    : status.isHalfExpired
    ? 'warning'
    : undefined
}

export default getOlaStatusTextType
