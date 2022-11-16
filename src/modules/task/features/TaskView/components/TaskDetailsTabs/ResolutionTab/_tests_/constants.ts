import { generateWord } from '_tests_/utils'
import { TaskTypeEnum } from 'modules/task/constants/common'

import { ResolutionTabProps } from '../index'

export const requiredProps: Pick<ResolutionTabProps, 'title' | 'type'> = {
  type: TaskTypeEnum.Request,
  title: generateWord(),
}

export const notRequiredProps: Omit<
  ResolutionTabProps,
  keyof typeof requiredProps
> = {
  techResolution: generateWord(),
  userResolution: generateWord(),
}
