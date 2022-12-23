import {
  generateAddress,
  generateDateString,
  generateIdStr,
  generatePhone,
  generateWord,
} from '_tests_/utils'
import { TaskOlaStatusEnum } from 'modules/task/constants/common'

import { MainDetailsProps } from '../index'

export const requiredProps: Pick<
  MainDetailsProps,
  | 'recordId'
  | 'title'
  | 'createdAt'
  | 'name'
  | 'contactService'
  | 'olaStatus'
  | 'olaEstimatedTime'
> = {
  name: generateWord(),
  title: generateWord(),
  recordId: generateIdStr(),
  createdAt: generateDateString(),
  contactService: generateWord(),
  olaEstimatedTime: Date.now(),
  olaStatus: TaskOlaStatusEnum.NotExpired,
}

export const notRequiredProps: Pick<
  MainDetailsProps,
  'address' | 'olaNextBreachTime' | 'contactPhone' | 'portablePhone'
> = {
  olaNextBreachTime: generateDateString(),
  address: generateAddress(),
  contactPhone: generatePhone(),
  portablePhone: generatePhone(),
}
