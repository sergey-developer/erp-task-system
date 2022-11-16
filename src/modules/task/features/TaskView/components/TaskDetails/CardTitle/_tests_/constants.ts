import { generateId } from '_tests_/utils'
import {
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'

import { CardTitleProps } from '../index'

export const requiredProps: CardTitleProps = {
  id: generateId(),
  type: TaskTypeEnum.Request,
  status: TaskStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  hasReclassificationRequest: false,
  isAssignedToCurrentUser: false,
  onClose: jest.fn(),
  onClickExecuteTask: jest.fn(),
  onClickRequestReclassification: jest.fn(),
}
