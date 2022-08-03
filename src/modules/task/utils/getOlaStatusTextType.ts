import { TextProps } from 'antd/es/typography/Text'

import { TaskOlaStatusEnum } from 'modules/task/constants/enums'
import { MaybeUndefined } from 'shared/interfaces/utils'

const getOlaStatusTextType = (
  olaStatus: TaskOlaStatusEnum,
): Extract<TextProps['type'], MaybeUndefined<'danger' | 'warning'>> => {
  return olaStatus === TaskOlaStatusEnum.Expired
    ? 'danger'
    : olaStatus === TaskOlaStatusEnum.HalfExpired
    ? 'warning'
    : undefined
}

export default getOlaStatusTextType
