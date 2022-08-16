import { TaskOlaStatusEnum } from 'modules/task/constants/enums'
import { BooleanMap, Keys } from 'shared/interfaces/utils'

const getOlaStatusMap = (
  olaStatus: TaskOlaStatusEnum,
): BooleanMap<`is${Keys<typeof TaskOlaStatusEnum>}`> => {
  return {
    isExpired: olaStatus === TaskOlaStatusEnum.Expired,
    isHalfExpired: olaStatus === TaskOlaStatusEnum.HalfExpired,
    isNotExpired: olaStatus === TaskOlaStatusEnum.NotExpired,
  }
}

export default getOlaStatusMap
