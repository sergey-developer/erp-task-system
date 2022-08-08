import { TaskOlaStatusEnum } from 'modules/task/constants/enums'
import { BooleanMap, Keys } from 'shared/interfaces/utils'

export type OlaStatusMap = BooleanMap<`is${Keys<typeof TaskOlaStatusEnum>}`>

const getOlaStatusMap = (olaStatus: TaskOlaStatusEnum): OlaStatusMap => {
  return {
    isExpired: olaStatus === TaskOlaStatusEnum.Expired,
    isHalfExpired: olaStatus === TaskOlaStatusEnum.HalfExpired,
    isNotExpired: olaStatus === TaskOlaStatusEnum.NotExpired,
  }
}

export default getOlaStatusMap
