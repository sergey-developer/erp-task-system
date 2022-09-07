import { TaskOlaStatusEnum } from 'modules/task/constants/enums'
import { BooleanMap, Keys } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

const getOlaStatusMap = (
  olaStatus: TaskOlaStatusEnum,
): BooleanMap<`is${Keys<typeof TaskOlaStatusEnum>}`> => ({
  isExpired: isEqual(olaStatus, TaskOlaStatusEnum.Expired),
  isHalfExpired: isEqual(olaStatus, TaskOlaStatusEnum.HalfExpired),
  isNotExpired: isEqual(olaStatus, TaskOlaStatusEnum.NotExpired),
})

export default getOlaStatusMap
